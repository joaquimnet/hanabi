const { Command } = require('sensum');

const createInteractionCommand = require('../../util/createInteractionCommand');
const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
const images = [
  'https://i.imgur.com/O5jzbBw.gif',
  'https://i.imgur.com/u49ZKl9.gif',
  'https://i.imgur.com/i1F9uRe.gif',
  'https://i.imgur.com/GLI4Ggo.gif',
  'https://i.imgur.com/UsdPibc.gif',
  'https://i.imgur.com/PRi52gF.gif',
  'https://i.imgur.com/B6zg6zz.gif',
  'https://i.imgur.com/NVoyJAG.gif',
  'https://i.imgur.com/gdjVPeJ.gif',
  'https://i.imgur.com/TVZ3cKp.gif',
  'https://i.imgur.com/DFddxld.gif',
  'https://i.imgur.com/HGrOjLb.gif',
  'https://i.imgur.com/JUmbpQy.gif',
  'https://i.imgur.com/InENWM1.gif',
  'https://i.imgur.com/lN1tvTq.gif',
  'https://i.imgur.com/cUALGMg.gif',
  'https://i.imgur.com/WVBrMeW.gif',
  'https://i.imgur.com/ZN0c2Am.gif',
  'https://i.imgur.com/R7A2FXG.gif',
];
// thank you
module.exports = new Command({
  name: 'gay',
  description:
    "Tell someone they're gay. That's it. That's the whole command. >u<",
  args: {
    target: 'string',
  },
  delete: true,
  category: 'interactions',
  usage: '{target}',
  examples: ['@Kaffe#9547', '@blu#0111'],
  run(bot, message, meta) {
    const gay = createInteractionCommand(
      `\n${meta.tag} says you're gay. What are you going to do about it? >u<`,
      random(images),
      message,
    );

    gay().catch((err) => bot.emit('error', err));
  },
});
