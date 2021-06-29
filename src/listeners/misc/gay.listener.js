const { Listener } = require('sensum');

//const send = require('../../services/safeSend');

module.exports = new Listener({
  words: ['{me}', '{be}', 'gay'],
  category: 'misc',
  cooldown: 15,
  globalCooldown: 1800,
  priority: 0,
  run(bot, message, meta) {
    meta.respond("You're gay and that's ok!");
    return true;
  },
});
