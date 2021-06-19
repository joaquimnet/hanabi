const { Command } = require('sensum');
const { MessageEmbed } = require('discord.js');

const { CATEGORY_EMOJIS } = require('../../util/constants.js');
const pkg = require('../../../package.json');

module.exports = new Command({
  name: 'help',
  description: 'Let me help you!',
  category: 'info',
  runIn: ['text', 'dm'],
  usage: '[command name]',
  examples: [' ', 'hug', 'yell'],
  run(bot, message, meta) {
    // return help about specific command
    const { args } = meta;
    if (args[0]) {
      const search = args[0].toLowerCase();
      const command = message.client.commands.find(
        (c) => c.name === search || c.aliases.includes(search),
      );
      if (!command || (command.hidden && !meta.isSuperUser)) {
        return this.send(`I could not find the ${args[0]} command.`);
      }
      // gather data and send it to same channel
      const embed = new MessageEmbed({
        author: {
          name: command.name.toUpperCase(),
          iconURL: message.author.avatarURL(),
        },
        footer: {
          text: `Version ${pkg.version} <3`,
          icon_url: this.client.user.avatarURL(),
        },
      });
      embed.addField(':blue_book: Description', command.description);
      if (command.aliases.length > 0) {
        embed.addField(
          ':books: Aliases',
          command.aliases.reduce((acc, cur) => `${acc} \`${cur}\``, ''),
        );
      }
      if (command.usage) {
        embed.addField(
          ':book: Usage',
          `\`\`\`${this.client.options.prefix}${command.name} ${command.usage}\`\`\`` +
            '```python\n' +
            '# Remove the brackets.\n' +
            '# {} = Required arguments\n' +
            '# [] = Optional arguments.```',
        );
      }
      const addExamples = (exampleType) => {
        const start = `${this.client.options.prefix}${command.name} `;
        const e = command[exampleType];
        const isArr = Array.isArray(e);
        const examples = isArr
          ? e.reduce((a, c) => `${a} \`\`\`${start}${c}\`\`\``, '')
          : `\`\`\`${start}${e}\`\`\``;
        embed.addField(':ledger: Example', examples);
      };
      if (command.example) {
        addExamples('example');
      }
      if (command.examples) {
        addExamples('examples');
      }
      return this.send({ embed });
    }

    // return a list of commands separated by category
    const embed = new MessageEmbed({
      author: { name: 'Hanabi-sama Help', iconURL: message.author.avatarURL() },
      footer: {
        text: `Version ${pkg.version} <3`,
        icon_url: this.client.user.avatarURL(),
      },
      description:
        'These are the commands available for Bloo.\n' +
        'To learn more about a command use `' +
        this.client.options.prefix +
        'help {command name}`',
    });

    const commandList = {};

    this.client.commands.forEach((c) => {
      commandList[c.category || 'other'] = [
        ...(commandList[c.category || 'other'] || []),
        c,
      ];
    });

    const cats = Object.keys(commandList);
    cats.sort();
    cats.forEach((category) => {
      embed.addField(
        `${CATEGORY_EMOJIS[category] || ':page_facing_up:'} ${category}`,
        '>' +
          commandList[category]
            .filter((c) => !c.hidden)
            .sort((a, b) => a < b)
            .reduce((acc, cur) => `${acc} \`${cur.name}\``, ''),
      );
    });
    return this.send({ embed });
  },
});
