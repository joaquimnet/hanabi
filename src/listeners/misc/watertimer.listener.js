const { Listener } = require('sensum');

module.exports = new Listener({
  words: ['{me}'],
  category: 'misc',
  cooldown: 21600,
  globalCooldown: 21600,
  priority: 0,
  async run(bot, message, meta) {
    message.channel.startTyping().catch(() => {});
    await bot.wait(3000);
    meta.respond(
      "Hey! I am popping in real quick to remind you to try and correct your posture and drink some water if you haven't in a while! Maybe grab a snack if you haven't eaten in a while as well!",
    )
    .then(() => message.channel.stopTyping())
    .catch(() =>{});
    return true;
  },
});
