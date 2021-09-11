const { Listener } = require('sensum');

module.exports = new Listener({
  words: ['{me}', 'wish', '(had|have)', 'friends'],
  category: 'misc',
  cooldown: 1800,
  globalCooldown: 1800,
  priority: 0,
  run(bot, message, meta) {
    const msg = bot.brain.think('Friends');
    this.send(msg);
    // meta.respond("I'm sure so many people would love to be friends with you. Making friends can be hard and stressful, but I do believe in you.");
    return true;
  },
});
