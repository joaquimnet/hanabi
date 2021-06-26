const { Listener } = require('sensum');

module.exports = new Listener({
  words: ['{me}', '(love|like|favorite)', 'winter'],
  category: 'seasons',
  cooldown: 5400,
  priority: 0,

  async run(bot, message, meta) {
    meta.respond(
      "I also like winter. A bit too cold for my taste, but it's also the best time to give gifts to people!! I enjoy when I am able to give gifts to people! It makes me happy.(｡･∀･)ﾉﾞ",
    );
    return true;
  },
});
