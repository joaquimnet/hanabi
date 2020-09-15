const { Listener } = require('@ponatech/bot');

module.exports = new Listener({
  words: ['{me}', '(tired|sleepy|exhausted)'],
  category: 'misc',
  cooldown: 6000,
  priority: 0,
  run(bot, message, meta) {
    meta.respond("Take a nap then, silly.:sleeping::orange_heart:");
    return true;
  },
});
