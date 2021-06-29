const { Listener } = require('sensum');

const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
const msg = [
  `Roblox has been around since 2006, but didn't pick up popularity until the later half of the 2010's, mostly due to the pandemic.`,
  `Each map is created by a user, specifically made by them.`,
  `Characters can be customized using gear and "glamours".`,
];
module.exports = new Listener({
  words: ['{me}', '(like|love|enjoy)', 'roblox'],
  category: 'games',
  cooldown: 10800,
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
