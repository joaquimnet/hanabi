const { Listener } = require('sensum');

const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
const msg = [`I'm sorry for you :(`];
module.exports = new Listener({
  words: [
    '{me}',
    '(love|enjoy|like)',
    '(dota|LoL|league of legends|World of Warcraft)',
  ],
  category: 'games',
  cooldown: 5400, // 5400 = 90 minutes <=
  priority: 0,

  run(bot, message, meta) {
    message.channel.startTyping().catch(() => {});
    // await bot.wait(1500);
    // this.send()
    meta
      .respond(random(msg))
      .then(() => message.channel.stopTyping())
      .catch(() => {});
    //await message.channel.stopTyping().catch(() => {});
    return true;
  },
});
