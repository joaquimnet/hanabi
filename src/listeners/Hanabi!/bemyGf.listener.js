const { Listener } = require('sensum');

module.exports = new Listener({
  words: ['hanabi', '{be}', 'my', '(gf|girlfriend)'],
  category: 'hanabi',
  cooldown: 10,
  globalCooldown: 1800,
  priority: 0,
  run(bot, message, meta) {
    meta.respond("I'm flattered... But I'm underage.");
    return true;
  },
});
