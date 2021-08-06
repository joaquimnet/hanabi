const { Listener } = require('sensum');

module.exports = new Listener({
  words: ['{me}', '(tired|sleepy|exhausted)'],
  category: 'misc',
  cooldown: 6000,
  globalCooldown: 6000,
  priority: 0,
  run(bot, message, meta) {
    this.send(bot.brain.think('Sleepy'));
    return true;
  },
});
