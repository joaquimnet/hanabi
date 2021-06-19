const { Command } = require('sensum');
const createInteractionCommand = require('../../util/createInteractionCommand');

const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
const images = [];

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
  async run(bot, message, meta) {
    const hold = createInteractionCommand(
      `I was sent by \n${meta.tag} to ask if you'd like to hold their hand :smiling_face_with_3_hearts:`,
      random(images),
      message,
    );

    hold().catch((err) => this.client.emit('error', err));
  },
});
