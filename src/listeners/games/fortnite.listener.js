const { Listener } = require('sensum');
// leave uncapitalized, or she doesn't pick up on it
const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
const msg = [
  `uwu I really want to..... chug jug with you ;)`,
  `I was never too good at battle royales :(`,
  `Even though people may like Fortnite, I haven't played it too much to know about it.
  However, I do think it has pretty colours and I do like the skins they offer!`,
  `I don't have recollection of playing Fortnite, maybe I should play it to add it to my memory!`,
];
module.exports = new Listener({
  words: ['{me}', '(like|love|enjoy)', '(forknife|fortnite|fortnight)'],
  category: 'games',
  cooldown: 5400,
  priority: 0,

  async run(bot, message, meta) {
    message.channel.startTyping().catch(() => {});
    await bot.wait(3000);

    await meta.respond(random(msg)).catch(() => {});

    await message.channel.stopTyping();

    // This return true at the end is so she won't talk about other games. In the case someone
    // sends a message with "fortnite" and some other game she also talks about. Like "I like fortnite and minecraft".
    // She would only talk about one at a time.
    return true;
  },
});

// CHUG JUG 😆🧺
