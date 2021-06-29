const { Listener } = require('sensum');

const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
const msg = [
  `Minecraft is a "sandbox" game that is offered on multiple platforms.
It is called a sandbox, because you can do anything you want to do with the game. This provides *mass* amounts of opportunity to do anything your heart pleases.`,
  `I enjoy playing/watching Minecraft because it's calming... well, if you play on peaceful!`,
  `Can you believe that Minecraft has been out for over a decade now?`,
  `**Ok Boomer!**`,
];
module.exports = new Listener({
  words: ['{me}', '(like|love|enjoy)', 'minecraft'],
  category: 'games',
  cooldown: 5080,
  globalCooldown: 1800,
  priority: 0,

  async run(bot, message, meta) {
    message.channel.startTyping().catch(() => {});
    await bot.wait(3000);
    meta
      .respond(random(msg))
      .then(() => message.channel.stopTyping())
      .catch(() => {});
    return true;
  },
});
