const { Command } = require('sensum');

const createInteractionCommand = require('../../util/createInteractionCommand');
const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
const images = [
  'https://i.imgur.com/0rKeYHS.gif',
  'https://i.imgur.com/cvrUqS2.gif',
  'https://i.imgur.com/bi0zucq.gif',
  'https://i.imgur.com/hEPcrUC.gif',
  'https://i.imgur.com/Z0iflXb.gif',
  'https://i.imgur.com/m1KNrxn.gif',
];

module.exports = new Command({
  name: 'marry',
  aliases: ['propose'],
  description:
    'You ever have your eyes on someone? Let them know and propose to them!',
  args: {
    target: 'string',
  },
  delete: true,
  category: 'interactions',
  usage: '{target}',
  examples: ['@Kaffe#9547', '@blu#0111'],
  run(bot, message, meta) {
    const marry = createInteractionCommand(
      `\n${meta.tag} has proposed to you. Congratulations! *I think..?*`,
      random(images),
      message,
    );
    marry().catch((err) => bot.emit('error', err));
  },
});
