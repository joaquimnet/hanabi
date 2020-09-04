const Prompter = require('chop-prompter');
const { Permission, Command } = require('@ponatech/bot');

module.exports = new Command({
  name: 'prefix',
  description: "Changes Hanabi-sama's prefix on your server.",
  category: 'maintenance',
  permission: Permission.MANAGE_GUILD,
  examples: [' ', '>', '!', '++'],
  runIn: ['guild'],
  async run(bot, message, meta) {
    const { args, settings } = meta;

    const customPrefix = settings.prefix;
    const defaultPrefix = bot.config.defaultSettings.prefix;

    if (!args[0]) {
      if (customPrefix) {
        this.send(`My prefix on this server is **${customPrefix}**`);
      } else {
        this.send(`My prefix on this server is the default one **${defaultPrefix}**.`);
      }
      return;
    }

    let newPrefix = args[0].trim().toLowerCase().replace(/\s\s+/g, '');

    const isValidPrefix = newPrefix.length > 0;

    if (!isValidPrefix) {
      this.send('That is not a valid prefix!');
      return;
    }

    if ([defaultPrefix, 'remove', 'delete'].includes(newPrefix)) {
      await bot.settings.update(settings._id, { prefix: null });
      this.send(`Removed! My prefix on this server is back to the default **${defaultPrefix}**`);
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

    await bot.settings.update(settings._id, { prefix: newPrefix });
    this.send(`Done! My prefix on this server is now **${newPrefix}**`);
  },
});
