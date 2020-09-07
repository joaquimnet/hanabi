const { Command } = require('@ponatech/bot');

const createInteractionCommand = require('../../util/createInteractionCommand');
const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
const images = [
  'https://i.imgur.com/nvGzZx4.gif',
  'https://i.imgur.com/CFYGWty.gif',
  'https://i.imgur.com/pbEdgZo.gif',
  'https://i.imgur.com/EEONqqc.gif',
  'https://i.imgur.com/5MQgb4i.gif',
  'https://i.imgur.com/Dd96MQy.gif',
  'https://i.imgur.com/MeGheqg.gif',
  'https://i.imgur.com/knIWShl.gif',
  'https://i.imgur.com/9x3PRRY.gif',
  'https://i.imgur.com/qwuTlIx.gif',
  'https://i.imgur.com/JjMvmOD.gif',
  'https://i.imgur.com/5hJvkNF.gif',
  'https://i.imgur.com/O6YdCOF.gif',
  'https://i.imgur.com/YZWrNeC.gif',
  'https://i.imgur.com/CzwWOXY.gif',
];
// thank you
module.exports = new Command({
  name: 'cuddle',
  description: "well... it's what it says",
  args: ['target'],
  delete: true,
  category: 'interactions',
  usage: '{target}',
  examples: ['@Kaffe#9547', '@blu#0111'],
  async run(bot, message, meta) {
    const cuddle = createInteractionCommand(
      `\n${meta.tag} has decided that they want to cuddle you. Hope I didn't make it weird o3o :hugging:`,
      // this thing here used to be a gif "tag" but now it has to be a gif url. do random(images)
      // thought so, but the embed, random images, how do i do such?
      random(images),
      message,
    );

    cuddle().catch((err) => bot.emit('error', err));
  },
});
