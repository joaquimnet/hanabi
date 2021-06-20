const { Listener } = require('sensum');
const Time = require('../../services/time.service.js');
const now = Time.moment();

module.exports = new Listener({
  words: ['how', 'old', 'are', 'you', 'hanabi'],
  category: 'hanabi',
  cooldown: 10,
  priority: 0,
  run(bot, message, meta) {
    const days = now.diff(Time.moment('09-02-2020'), 'days');
    meta.respond(`I was born ${[Time.moment('09-02-2020').fromNow()]}!`);
    return true;
  },
});
