const { Command } = require('sensum');

const createInteractionCommand = require('../../util/createInteractionCommand');
const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
const images = [
  'https://i.imgur.com/RvCv0Kn.gif',
  'https://i.imgur.com/7ETJSGC.gif',
  'https://i.imgur.com/iZvMpey.gif',
  'https://i.imgur.com/PKBfSxQ.gif',
  'https://i.imgur.com/wBqbBRM.gif',
  'https://i.imgur.com/4zcxfzE.gif',
  'https://i.imgur.com/nmGIbmf.gif',
  'https://i.imgur.com/EaVpnDJ.gif',
  'https://i.imgur.com/ZlaZ2y4.gif',
  'https://i.imgur.com/Y7V08zl.gif',
  'https://i.imgur.com/OsGVA4g.gif',
  'https://imgur.com/2oHquZ6.gif',
  'https://imgur.com/XneffgW.gif',
  'https://i.imgur.com/CYaZ67O.gif',
  'https://imgur.com/fxAwYq2.gif',
  'https://imgur.com/qyoM2Ll.gif',
  'https://imgur.com/7gRzxET.gif',
  'https://i.imgur.com/vJMKGXo.gif',
  'https://i.imgur.com/3aUqrCy.gif',
];

module.exports = new Command({
  name: 'punch',
  // aliases: [''],
  description: "When politeness doesn't work... Resort to violence.",
  args: {
    target: 'string',
  },
  delete: true,
  category: 'interactions',
  usage: '{target}',
  examples: ['@Kaffe#9547', '@blu#0111'],
  run(bot, message, meta) {
    const punch = createInteractionCommand(
      `\n${meta.tag} has punched you. I suggest maybe... just **maybe**... stop doing whatever you did to deserve that?`,
      random(images),
      message,
    );
    punch().catch((err) => bot.emit('error', err));
  },
});
