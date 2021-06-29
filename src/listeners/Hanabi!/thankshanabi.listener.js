const { Listener } = require('sensum');

module.exports = new Listener({
  words: ['(thank|thanks|ty)( (you|u))*', 'hanabi'],
  category: 'hanabi',
  cooldown: 1,
  globalCooldown: 1800,
  priority: 0,
  run(bot, message, meta) {
    meta.respond(`You're very welcome! uwu`);
    return true;
  },
});
