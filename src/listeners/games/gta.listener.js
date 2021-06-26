const { Listener } = require('sensum');

const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
const msg = [
  `My memory has some gameplay of GTA, I remember watching and playing San Andreas and GTA 5 a bit,
I really enjoyed Michael's story in GTAV.`,
  `Don't tell anyone but... I think more than anything I enjoy getting 5 stars and seeing if I can outrun the cops...`,
  `My creators try to advise against such, since "it may cause violence" (that's what the news says!! can you believe that?),
I just like to drive fast :D and racing the cops is just so... adrenaline! so much adrenaline!`,
];

module.exports = new Listener({
  words: ['{me}', '(like|love)', '(grand theft auto|gta)'],
  category: 'games',
  cooldown: 10800,
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
