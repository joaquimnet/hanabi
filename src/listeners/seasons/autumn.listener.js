const { Listener } = require('sensum');

module.exports = new Listener({
  words: ['{me}', '(love|like|favorite)', 'autumn'],
  category: 'seasons',
  cooldown: 5400,
  globalCooldown: 5400,
  priority: 0,

  async run(bot, message, meta) {
    meta.respond(
      "Autumn is the season in which leaves start to fall. Who doesn't love the sound of crinkling of leaves under their feet? Bonfires, s'mores, what more could be better?",
    );
    return true;
  },
});
