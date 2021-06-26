const { Listener } = require('sensum');

module.exports = new Listener({
  words: ['((haha|lmao|lmfao|lol|rofl|teehee|lel|kek|lul)|kkkkkk+)'],
  category: 'haha',
  cooldown: 1800000,
  priority: 0,
  run(bot, message, meta) {
    meta.respond("The only thing funny here is your face (': ");
    return true;
  },
});
