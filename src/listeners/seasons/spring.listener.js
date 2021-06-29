const { Listener } = require('sensum');

module.exports = new Listener({
  words: ['{me}', '(love|like|favorite)', 'spring'],
  category: 'seasons',
  cooldown: 5400,
  globalCooldown: 5400,
  priority: 0,

  async run(bot, message, meta) {
    meta.respond(
      'Spring is the start of the new seasons. With flowers blooming, trees getting their leaves again. I enjoy spring, a bit-- but I think summer is my favorite season!',
    );
    return true;
  },
});
