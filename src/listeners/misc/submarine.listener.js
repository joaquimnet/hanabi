const { Listener } = require('sensum');

module.exports = new Listener({
  words: ['submarine(s)?'],
  category: 'misc',
  cooldown: 21600,
  globalCooldown: 21600,
  priority: 0,
  async run(bot, message, meta) {
    message.channel.startTyping().catch(() => {});
    await bot.wait(3000);
    const msg = bot.brain.think('Submarine', meta);
    meta.respond(
      // "Hey! I am popping in real quick to remind you to try and correct your posture and drink some water if you haven't in a while! Maybe grab a snack if you haven't eaten in a while as well!",
      msg
    )
    .then(() => message.channel.stopTyping())
    .catch(() =>{});
    return true;
  },
});
