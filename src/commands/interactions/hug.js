const { Command } = require('@ponatech/bot');

const createInteractionCommand = require('../../util/createInteractionCommand');
const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
const images = [
  'https://i.imgur.com/ZH2JnqL.gif',
  'https://i.imgur.com/gnA7Nnx.gif',
  'https://i.imgur.com/uHMVUTN.gif',
  'https://i.imgur.com/Kqa0rWq.gif',
  'https://i.imgur.com/vm98zFp.gif',
  'https://i.imgur.com/LxiAgo5.gif',
  'https://i.imgur.com/O8ZoqTK.gif',
  'https://i.imgur.com/76GDgnU.gif',
  'https://i.imgur.com/BId7nl0.gif',
  'https://i.imgur.com/IuqTUND.gif',
  'https://i.imgur.com/ZWdJbpj.gif',
  'https://i.imgur.com/BzjFTDy.gif',
  'https://i.imgur.com/pAQmr5U.gif',
  'https://i.imgur.com/HTNykMh.gif',
  'https://i.imgur.com/XFxypew.gif',
  'https://i.imgur.com/PFl8kY6.gif',
  'https://i.imgur.com/2azyrHM.gif',
  'https://i.imgur.com/xpRBz4Z.gif',
  'https://i.imgur.com/toVxamA.gif',
  'https://i.imgur.com/TslJITF.gif',
  'https://i.imgur.com/QPG3r6N.gif',
  'https://i.imgur.com/qEP5ZOy.gif',
  'https://i.imgur.com/vTkRK2k.gif',
  'https://i.imgur.com/6lB5r7Q.gif',
  'https://i.imgur.com/yIscwXX.gif',
  'https://i.imgur.com/XiyxFQQ.gif',
  'https://i.imgur.com/BAZpbQg.gif',
  'https://i.imgur.com/RwfnaeX.gif',
  'https://i.imgur.com/QesY7wl.gif',
  'https://i.imgur.com/4Keofog.gif',
  'https://i.imgur.com/JdeCDvR.gif',
  'https://i.imgur.com/ECdfxCX.gif',
  'https://i.imgur.com/OVaOVNk.gif',
  'https://i.imgur.com/yJoESW4.gif',
  'https://i.imgur.com/bFRYNPr.gif',
  'https://i.imgur.com/pygp3ee.gif',
];

module.exports = new Command({
  name: 'hug',
  description:
    'let them know you care about them, give them a hug :smiling_face_with_3_hearts:',
  args: ['target'],
  delete: true,
  category: 'interactions',
  usage: '{target}',
  examples: ['@Kaffe#6969', '@blu#0111'],
  run(bot, message, meta) {
    const hug = createInteractionCommand(
      `\n${meta.tag} has given you a big ole hug, you oughta send them one back! :heart: `,
      random(images),
      message,
    );

    hug().catch((err) => bot.emit('error', err));
  },
});
