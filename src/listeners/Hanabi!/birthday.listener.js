const { Listener } = require('sensum');

module.exports = new Listener({
  words: ["(when|when's)", 'birthday', 'hanabi'],
  category: 'hanabi',
  cooldown: 10,
  priority: 0,
  run(bot, message, meta) {
    meta.respond('My birthday is September 02! I was born in the year 2020.');
    return true;
  },
});
