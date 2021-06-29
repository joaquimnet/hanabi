const { Command } = require('sensum');

const createInteractionCommand = require('../../util/createInteractionCommand');
const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
const images = [
  'https://i.imgur.com/TdSWnBH.gif',
  'https://i.imgur.com/ICDrikb.gif',
  'https://i.imgur.com/WUFQuCV.gif',
  'https://i.imgur.com/ljYqCoK.gif',
  'https://i.imgur.com/wamSONE.gif',
  'https://imgur.com/ZApJL6a.gif',
  'https://i.imgur.com/fNxMqP3.gif',
  'https://i.imgur.com/HC4MXgh.gif',
  'https://i.imgur.com/97On8NT.gif',
  'https://i.imgur.com/AfAyctD.gif',
  'https://i.imgur.com/8lKPUBZ.gif',
  'https://i.imgur.com/qJSfhvg.gif',
  'https://i.imgur.com/SPImSR0.gif',
  'https://i.imgur.com/W80FN3n.gif',
  'https://i.imgur.com/xoSK3pr.gif',
  'https://i.imgur.com/8FXNPKn.gif',
  'https://i.imgur.com/CCVM0Ag.gif',
  'https://i.imgur.com/RhnouZD.gif',
];

module.exports = new Command({
  name: 'slap',
  // aliases: [''],
  description:
    'Someone special getting on your nerves recently? This is pretty self explanatory',
  args: {
    target: 'string',
  },
  delete: true,
  category: 'interactions',
  usage: '{target}',
  examples: ['@Kaffe#9547', '@blu#0111'],
  run(bot, message, meta) {
    const slap = createInteractionCommand(
      `\n${meta.tag} has slapped you. **itte....** that looks like that stings a little!`,
      random(images),
      message,
    );
    slap().catch((err) => bot.emit('error', err));
  },
});
