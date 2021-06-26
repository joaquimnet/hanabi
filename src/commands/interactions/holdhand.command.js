const { Command } = require('sensum');
const createInteractionCommand = require('../../util/createInteractionCommand');

const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
const images = [
  'https://i.imgur.com/tdvvRXJ.gif',
  'https://i.imgur.com/i5YkIui.gif',
  'https://i.imgur.com/JTRZTA0.gif',
  'https://i.imgur.com/vWvFkhv.gif',
  'https://i.imgur.com/QAIjbu2.gif',
  'https://i.imgur.com/dXP5H3t.gif',
  'https://i.imgur.com/GCUOiEt.gif',
  'https://i.imgur.com/qoqeRQ3.gif',
  'https://i.imgur.com/KSRFvrm.gif',
];

module.exports = new Command({
  name: 'hold',
  description: 'Tell someone you want to hold their hand :heart:',
  args: {
    target: 'string',
  },
  delete: true,
  category: 'interactions',
  usage: '{target}',
  examples: ['@Kaffe#9547', '@blu#0111'],
  hidden: false,
  async run(bot, message, meta) {
    const hold = createInteractionCommand(
      `I was sent by \n${meta.tag} to ask if you'd like to hold their hand :smiling_face_with_3_hearts:`,
      random(images),
      message,
    );

    hold().catch((err) => this.client.emit('error', err));
  },
});
