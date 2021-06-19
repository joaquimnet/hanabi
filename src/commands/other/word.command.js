//this one will be fun
// Text doesn't exist.......................
const { Command } = require('sensum');
const WordPOS = require('wordpos');

const words = new WordPOS();

module.exports = new Command({
  name: 'define',
  description: 'Shows information about a word.',
  category: 'other',
  aliases: ['word', 'dictionary'],
  args: {
    word: 'string',
  },
  async run(bot, message, meta) {
    // 👍
    const { args } = meta; // i thought it would be too simple to be just meta................
    const lookup = args.word
      ? args.word.replace(/[^a-zA-Z ]/g, '').trim()
      : null;
    if (!lookup) {
      meta.respond(`Hey! You have to pass a valid word for me to look up.`);
      return;
    }

    const [result] = await words.lookup(lookup);
    const { def, gloss, synonyms } = result || {};

    if (!def || !synonyms || !gloss) {
      meta.respond("I couldn't find information about that word. :c");
      return;
    }

    const msg = [
      `**${lookup.toUpperCase()}**`,
      `**Definition: **${def}.`,
      def === gloss ? undefined : `**Gloss: **${gloss}`,
      `**Synonyms: **${synonyms.join(', ')}.`,
    ].filter((v) => !!v); // hey kaffe it was working just fine a second ago : thonk :

    meta.respond(...msg); // '-'
  },
});
