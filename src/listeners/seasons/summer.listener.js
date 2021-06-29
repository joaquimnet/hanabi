const { Listener } = require('sensum');

module.exports = new Listener({
  words: ['{me}', '(love|like|favorite)', 'summer'],
  category: 'seasons',
  cooldown: 5400,
  globalCooldown: 5400,
  priority: 0,

  async run(bot, message, meta) {
    meta.respond(
      "Ah yes, the devil's buttcrack season! Everyone either **loves** or **hates** this season. It's the best season to go swimming, and it's the best season to see fireworks! I really like fireworks. Especially when they reflect over bodies of water.",
    );
    return true;
  },
});
