const Prompter = require('chop-prompter');
const { Permission, Command } = require('sensum');

module.exports = new Command({
  name: 'prefix',
  description: "Changes Hanabi's prefix on your server.",
  category: 'admin',
  permission: Permission.MANAGE_GUILD,
  usage: '[new prefix]',
  examples: [' ', '>', '!', '++'],
  runIn: ['text'],
  args: {
    prefix: 'string',
  },
  async run(bot, message, meta) {
    const { args } = meta;

    const customPrefix = meta.settings.prefix;
    const defaultPrefix = bot.config.defaultSettings.prefix;

    if (!args.prefix) {
      if (customPrefix) {
        this.send(`My prefix in here is **${customPrefix}**`);
      } else {
        this.send(`My prefix in here is the default one **${defaultPrefix}**.`);
      }
      return;
    }

    let newPrefix = args.prefix.trim().toLowerCase().replace(/\s\s+/g, '');

    const isValidPrefix = newPrefix.length > 0;

    if (!isValidPrefix) {
      this.send('That is not a valid prefix!');
      return;
    }

    if ([defaultPrefix, 'remove', 'delete'].includes(newPrefix)) {
      meta.settings.prefix = null;
      await meta.settings.save();
      this.send(
        `Removed! My prefix on this server is back to the default **${defaultPrefix}**`,
      );
      return;
    }

    const shouldIncludeDanglingSpace = await Prompter.confirm({
      channel: message.channel,
      question: bot.lines(
        `Would you like to add a space to the end of **${newPrefix}**?`,
        `With space: __${newPrefix} help__`,
        `Without space: __${newPrefix}help__`,
      ),
      userId: meta.userId,
    });

    if (shouldIncludeDanglingSpace) {
      newPrefix += ' ';
    }

    meta.settings.prefix = newPrefix;
    await meta.settings.save();
    this.send(`Done! My prefix on this server is now **${newPrefix}**`);
  },
});
