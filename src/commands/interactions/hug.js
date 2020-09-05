const { Command } = require('@ponatech/bot');

const createInteractionCommand = require('../../util/createInteractionCommand');

module.exports = new Command({
  name: 'hug',
  description:
    'let them know you care about them, give them a hug :smiling_face_with_3_hearts:',
  args: ['target'],
  delete: true,
  category: 'interactions',
  usage: '{target}',
  examples: ['@Kaffe#9547', '@blu#0111'],
  run(bot, message, meta) {
    //const { args } = meta;
    const hug = createInteractionCommand(
      `\n${meta.tag} has given you a big ole hug, you oughta send them one back! :heart: `,
      'hug',
      message,
    );

    hug().catch((err) => this.client.emit('error', err));
  },
});
