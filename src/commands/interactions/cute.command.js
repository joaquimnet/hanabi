const { Command } = require('sensum');

const createInteractionCommand = require('../../util/createInteractionCommand');
const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
const images = [
  'https://i.pinimg.com/originals/b7/4a/5b/b74a5b128b5d65ea1fdb9090c0b3f295.gif',
  'https://media1.tenor.com/images/daa09a16c31d2bc87d26188abdf9a273/tenor.gif?itemid=16552229',
  'https://i.imgur.com/hvbNFS8.gif',
  'https://i.imgur.com/78izCLu.gif',
  'https://i.imgur.com/8Vb9Jq0.gif',
  'https://i.imgur.com/ZRCdFCv.gif',
  'https://i.imgur.com/wVGSMVm.gif',
  'https://i.imgur.com/EW1XARu.gif',
  'https://i.imgur.com/W7zrMM6.gif',
  'https://i.imgur.com/Sh3AwZW.gif',
  'https://i.imgur.com/k0fgJOn.gif',
];
// no u
// cute stuff c;
module.exports = new Command({
  name: 'cute',
  aliases: ['pretty'],
  description: "Tell someone they're cute :smiling_face_with_3_hearts:",
  args: {
    target: 'string',
  },
  delete: true,
  category: 'interactions',
  usage: '{target}',
  examples: ['@Kaffe#9547', '@blu#0111'],
  async run(bot, message, meta) {
    const cute = createInteractionCommand(
      `Hey there! \n${meta.tag} said you're cute. ;)`,
      random(images),
      message,
    );

    cute().catch((err) => bot.emit('error', err));
  },
});
