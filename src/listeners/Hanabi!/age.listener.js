const { Listener } = require('sensum');
const Time = require('../../services/time.service.js');
const now = Time.moment();

module.exports = new Listener({
  words: ['how', 'old', 'are', 'you', 'hanabi'],
  category: 'hanabi',
  cooldown: 600,
  globalCooldown: 1800,
  priority: 0,
  // as of todays date: she is 291 days old :D 06.20.2021
  run(bot, message, meta) {
    const days = now.diff(Time.moment('2020-09-02'), 'days');
    meta.respond(`I was born ${days} days ago!`);
    return true;
  },
});
