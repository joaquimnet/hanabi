const { Command } = require('sensum');

const createInteractionCommand = require('../../util/createInteractionCommand');
const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
const images = [
  'https://i.imgur.com/422kiKH.gif',
  'https://i.imgur.com/FBxzDrg.gif',
  'https://i.imgur.com/FxI6eQt.gif',
  'https://i.imgur.com/AodHFbv.gif',
  'https://i.imgur.com/taof54C.gif',
  'https://i.imgur.com/hRvjF9b.gif',
  'https://i.imgur.com/sMNUrA8.gif',
  'https://i.imgur.com/0XI81Lg.gif',
  'https://i.imgur.com/fZGWKXi.gif',
  'https://i.imgur.com/lVLCvQo.gif',
  'https://i.imgur.com/u63rL3c.gif',
  'https://i.imgur.com/9mL3APp.gif',
  'https://i.imgur.com/28sF1LT.gif',
  'https://i.imgur.com/FSdSUyP.gif',
  'https://i.imgur.com/r5nhU9d.gif',
  'https://i.imgur.com/tHGY4Rh.gif',
];

module.exports = new Command({
  name: 'poke',
  aliases: ['propose'],
  description: 'Pester your friends. Do it.',
  args: {
    target: 'string',
  },
  delete: true,
  category: 'interactions',
  usage: '{target}',
  examples: ['@Kaffe#9547', '@blu#0111'],
  run(bot, message, meta) {
    const poke = createInteractionCommand(
      `\n${meta.tag} has poked you. *poke them back maybe?*`,
      random(images),
      message,
    );
    poke().catch((err) => bot.emit('error', err));
  },
});
