const { Listener, Text } = require('sensum');

module.exports = new Listener({
  words: ['hanabi', 'prefix'],
  category: 'hanabi',
  cooldown: 900000,
  priority: 0,
  run(bot, message, meta) {
    const customPrefix = meta.settings.prefix;
    const defaultPrefix = bot.config.defaultSettings.prefix;

    if (customPrefix) {
      meta.respond(
        `My prefix on this server is **${customPrefix}**`,
        `To learn about my commands use **${customPrefix}help**.`,
      );
    } else {
      meta.respond(
        `My prefix on this server is the default one **${defaultPrefix}**.`,
        `To learn about my commands use **${defaultPrefix}help**.`,
      );
    }
    return true;
  },
});
