const { Listener } = require('sensum');

const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
const msg = [
  `Ah yes, __**Final Fantasy 14**__! A world known MMO. Known for the beautiful graphics, interchangeable classes, and storyline.
  I can't blame you for enjoying the game. It's beautiful and the community is wonderful.`,
  `From Nekos __(Miqo'te)__, to Dragons __(Au Ra)__, to little potatoes __(Lalefell)__, to the glorious Bunny Girls__(Viera)__...
  So much is offered in this game. There's __Hyur__ which is basically human, __Hrothgar__ which are the BEASTS of the land.
  You're short irl? Easy, just play as a __Roegadyn__, they stand at a whopping 7+ feet tall!!
  __Elezen__ are right up there as well, with their gracious movements and lean builds.`,
  `Everyone loves final fantasy 14, you can't go wrong with it. But man oh man... ~~Don't let me get started on Thancred~~...`,
  `Did you know that Endwalker (the **end/beginning** of a new storyline) is coming out on November 23rd, 2021?
  They will be offering two new classes!! Reaper which is a melee dps, and Sage a healer with nouliths. They both look extremely interesting. 
  Endwalker will also bump the level cap to 90, which will be very interesting to see. Endwalker is also giving us a new zone as well! 
  We are going to have SO much fun, yeah? **(づ￣ 3￣)づ**`,
];
/* `Everyone loves final fantasy 14, you can't go wrong with it.`,
    `But man oh man... ~~Don't let me get started on Thancred~~...`, */
module.exports = new Listener({
  words: ['{me}', '(love|enjoy|like)', '(ffxiv|final fantasy 14)'],
  category: 'games', // 🎮🕹😹
  cooldown: 1800, // 5400 = 90 minutes <=
  globalCooldown: 1800,
  priority: 0,
  // maxMessageLength: 100,
  init() {
    console.log('ur mom gey');
  },
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
