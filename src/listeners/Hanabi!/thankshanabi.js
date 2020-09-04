const { Listener } = require('@ponatech/bot');

module.exports = new Listener({
  words: ['thank', 'you', 'hanabi'],
  category: 'hanabi',
  cooldown: 1,
  priority: 0,
  run(bot, message, meta) {
    meta.respond(`You're very welcome! uwu`);
    return true;
  },
});