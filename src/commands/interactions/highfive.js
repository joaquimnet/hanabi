const { Command } = require('@ponatech/bot');

const createInteractionCommand = require('../../util/createInteractionCommand');

module.exports = new Command({
  name: 'highfive',
  description: 'let your buddies know what they did was awesome! :grin:',
  args: ['target'],
  delete: true,
  category: 'interactions',
  usage: '{target}',
  examples: ['@Kaffe#9547', '@blu#0111'],
  async run(bot, message, meta) {
    // const {args} = meta;
    const highfive = createInteractionCommand(
      `\n${meta.tag} has high-fived you :raised_hand: :pray: good job, on whatever you did to deserve a high-five :grin:`,
      'highfive',
      message,
    );

    highfive().catch((err) => this.client.emit('error', err));
  },
});
