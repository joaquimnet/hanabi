const { Listener } = require('sensum');

module.exports = new Listener({
  words: ['illegal'],
  category: 'hanabi',
  cooldown: 30,
  priority: 0,
  run(bot, message, meta) {
    meta.respond('No illegal things happening in this server, please. :gun:');
    return true;
  },
});
