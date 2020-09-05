const { Listener, Text } = require('@ponatech/bot');

module.exports = new Listener({
  words: ['hanabi', 'prefix'],
  category: 'hanabi',
  cooldown: 900000,
  priority: 0,
  run(bot, message, meta) {
    const { prefix } = this.client.options;
    meta.respond(
      Text.lines(
        `Do you want to know my prefix? My prefix is **${prefix}**.`,
        `To learn about my commands use **${prefix}help**.`,
      ),
    );
    return true;
  },
});
