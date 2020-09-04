const { Listener } = require('@ponatech/bot');

module.exports = new Listener({
  words: ['(haha|lmao|lmfao|lol|rofl|teehee|lel)'],
  category: 'haha',
  cooldown: 180000,
  priority: 0,
  run(bot, message, meta) {
    meta.respond("The only thing funny here is your face (': ");
    return true;
  },
});