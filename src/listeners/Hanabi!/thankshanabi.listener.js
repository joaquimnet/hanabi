const { Listener } = require('sensum');

module.exports = new Listener({
  words: ['(thank|thanks)( (you|u))*', 'hanabi'],
  category: 'hanabi',
  cooldown: 1,
  priority: 0,
  run(bot, message, meta) {
    meta.respond(`You're very welcome! uwu`);
    return true;
  },
});
