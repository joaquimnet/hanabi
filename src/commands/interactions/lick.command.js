const { Command } = require('sensum');

const createInteractionCommand = require('../../util/createInteractionCommand');

module.exports = new Command({
  name: 'lick',
  description: 'okay.. this is pretty self explanatory',
  args: {
    target: 'string',
  },
  delete: true,
  category: 'interactions',
  usage: '{target}',
  examples: ['@Kaffe#9547', '@blu#0111'],
  hidden: true,
  async run(bot, message, meta) {
    // const {args} = meta
    const lick = createInteractionCommand(
      `Well.. How do I say this..\n \n${meta.tag} has licked you. And now, I will proceed to walk away... :zany_face: `,
      'lick',
      message,
    );

    lick().catch((err) => this.client.emit('error', err));
  },
});
