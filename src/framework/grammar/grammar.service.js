const tracery = require('tracery-grammar');

class Grammar {
  static parse(rawData) {
    const lines = rawData.split('\n').filter((line) => !line.startsWith('//'));

    let name;
    const blocks = [];

    let currentBlock = [];

    name = lines.shift().trim();
    if (!name.length) {
      throw new Error(
        `Invalid name in grammar file.` + '\n' + rawData.substr(0, 100),
      );
    }
    if (lines[0].trim() === '') {
      lines.shift();
    }

    for (const [i, line] of lines.entries()) {
      let blockLine = line.trim();
      if (blockLine.length) {
        if (/ ->$/.test(blockLine)) {
          blockLine = blockLine.replace(/ ->$/, '');
        } else {
          blockLine = blockLine + '\n';
        }
        if (/\$([^$]*)$/.test(blockLine)) {
          if (blockLine.endsWith('\n')) {
            blockLine = blockLine.trim();
            blockLine = blockLine
              .replace(/\$([^$]*)$/, `\n#${name}_${blocks.length + 1}$1#`)
              .replace(/\n$/, '')
              .replace(/ #$/, '#');
          } else {
            blockLine = blockLine
              .replace(/\$([^$]*)$/, `#${name}_${blocks.length + 1}$1#`)
              .replace(/\n$/, '')
              .replace(/ #$/, '#');
          }
        } else {
          blockLine = blockLine + `#${name}_${blocks.length + 1}#`;
        }
        if (blockLine.startsWith('--empty--')) {
          blockLine = '';
        }
        if (blockLine.includes('--end--')) {
          blockLine = blockLine.replace(/#.+?#.*?$/, '').replace('--end--', '');
        }
        if (blockLine.match(/--skip:.--/)) {
          const num = blockLine
            .match(/--skip:.+?--/)[0]
            .match(/\d/g)
            .join('');
          blockLine = blockLine
            .replace(/#.+?#/, '')
            .replace(/--skip:.+?--/, `#${name}_${num}#`)
            .trim();
        }
        const matchInserts = blockLine.match(/\{grammar:.+?\}/g);
        for (const match of matchInserts ?? []) {
          const otherGrammarName = match
            .match(/:.+?\}/)?.[0]
            .replace(':', '')
            .replace('}', '')
            .trim();
          if (otherGrammarName === name) {
            blockLine = blockLine.replace(match, `INVALID_GRAMMAR_LINK`);
          } else {
            blockLine = blockLine.replace(match, `#${otherGrammarName}#`);
          }
        }
        currentBlock.push(blockLine);
      }

      if (i === lines.length - 1 || line.trim() === '') {
        blocks.push({ [name + '_' + blocks.length]: [...currentBlock] });
        currentBlock = [];
        continue;
      }
    }

    blocks.unshift({ [name]: [`#${name + '_0'}#`] });

    blocks[blocks.length - 1][name + '_' + String(blocks.length - 2)] = blocks[
      blocks.length - 1
    ][name + '_' + String(blocks.length - 2)].map((line) =>
      line.replace(/#.+?#.*?$/, ''),
    );

    const grammar = blocks.reduce(
      (acc, cur) => Object.assign({}, acc, cur),
      {},
    );
    return { name, grammar };
  }
}

class Brain {
  constructor(bot, grammarFiles) {
    this.bot = bot;
    this.grammar = this._buildTraceryGrammarObject(
      grammarFiles.map((raw) => {
        const g = Grammar.parse(raw);
        return g.grammar;
      }),
    );
  }

  think(grammarName, context) {
    if (!this.grammar) return '';
    const flattened = this.grammar.flatten(`#${grammarName}#`);
    return this._injectVariables(flattened, context);
  }

  _buildTraceryGrammarObject(grammars) {
    const combinedGrammars = grammars.reduce(
      (acc, cur) => Object.assign({}, acc, cur),
      {},
    );
    const grammar = tracery.createGrammar(combinedGrammars);
    grammar.addModifiers(tracery.baseEngModifiers);
    this.grammar = grammar;
    return grammar;
  }

  _injectVariables(text, context) {
    const matches = text.match(/\{.+?\}/g);
    if (matches) {
      for (const match of matches) {
        text = text.replace(
          match,
          this._resolveDynamicVariables(match, context),
        );
      }
      return text;
    } else {
      return text;
    }
  }

  _resolveDynamicVariables(str, context) {
    const options = str
      .replace(/(^{)|(}$)/, '')
      .trim()
      .split(' or ')
      .map((item) => item.trim());

    for (const option of options) {
      if (option.match(/(^")|("$)/)) {
        return option.replace(/(^\{)|(\}$)/, '').replace(/(^")|("$)/g, '');
      }
      const resolved = this._drillObject(option, context);
      if (resolved) {
        return resolved;
      }
    }

    return '((unknown))';
  }

  _drillObject(path, obj) {
    const parts = path.split('.').filter(Boolean);
    if (!parts.length) return undefined;

    let current = obj;
    for (const part of parts) {
      current = current?.[part];
    }
    return current;
  }
}

module.exports = Brain;
