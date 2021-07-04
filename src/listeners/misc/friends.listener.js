const { Listener } = require('sensum');

module.exports = new Listener({
  words: 'i wish i had friends',
  category: 'misc',
  cooldown: 1800,
  globalCooldown: 1800,
  priority: 0,
  run(bot, message, meta) {
    meta.respond("I'm sure so many people would love to be friends with you. Making friends can be hard and stressful, but I do believe in you.");
    return true;
  },
});
