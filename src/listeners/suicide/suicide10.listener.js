const { Listener } = require('sensum');

const MSG = require('./suicide-message');

module.exports = new Listener({
  words: ['everything would be better without me', '(here|existing)'],
  category: 'suicide',
  cooldown: 10,
  priority: 0,
  run(bot, message, meta) {
    this.send(...MSG);
    return true;
  },
});
