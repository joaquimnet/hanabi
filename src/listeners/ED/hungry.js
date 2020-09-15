const { Listener } = require('@ponatech/bot');

module.exports = new Listener({
  words: ['{me}', '(starving|famished|hungry)'],
  category: 'ED',
  cooldown: 6000,
  priority: 0,
  run(bot, message, meta) {
    meta.respond("Maybe you should find some food? A light snack? An actual meal? Please don't forget to eat!! :orange_heart:");
    return false;
  },
});
