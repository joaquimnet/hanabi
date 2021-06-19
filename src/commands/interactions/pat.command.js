const { Command } = require('sensum');

const createInteractionCommand = require('../../util/createInteractionCommand');

module.exports = new Command({
  name: 'pat',
  description: 'a gentle way of saying.. there-there.',
  aliases: ['pat'],
  args: {
    target: 'string',
  },
  delete: true,
  category: 'interactions',
  usage: '{target}',
  examples: ['@Kaffe#9547', '@blu#0111'],
  async run(bot, message, meta) {
    // const{args} = meta;
    const pat = createInteractionCommand(
      `*pat-pat* \n${meta.tag} has pat you c:`,
      'pat',
      message,
    );

    pat().catch((err) => this.client.emit('error', err));
  },
});
