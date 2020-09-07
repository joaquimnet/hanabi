const { Listener } = require('@ponatech/bot');

//const send = require('../../services/safeSend');

module.exports = new Listener({
  words: ['{me}', '{be}', 'gay'],
  category: 'misc',
  cooldown: 15,
  priority: 0,
  run(bot, message, meta) {
    meta.respond("You're gay and that's ok!");
    return true;
  },
});
