const { Listener } = require('sensum');

module.exports = new Listener({
  words: ['hanabi'],
  category: 'hanabi',
  // 30 minutes (Hanabi hears her name only every thirty minutes)
  cooldown: 1800000,
  priority: 10,
  run(bot, message, meta) {
    meta.respond('I heard my name! How are we today? :white_flower:');
    return true;
  },
});
