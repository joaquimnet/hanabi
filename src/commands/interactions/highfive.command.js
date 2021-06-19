const { Command } = require('sensum');

const createInteractionCommand = require('../../util/createInteractionCommand');
const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
const images = [
  'https://i.imgur.com/bRW118E.gif',
  'https://i.imgur.com/B5nxheq.gif',
  'https://i.imgur.com/31l9POr.gif',
  'https://i.imgur.com/7V1WYBe.gif',
  'https://i.imgur.com/OAwIdSV.gif',
  'https://i.imgur.com/wJSikuM.gif',
  'https://i.imgur.com/nkX6Kjf.gif',
  'https://i.imgur.com/zuVbNQR.gif',
  'https://i.imgur.com/fphvoez.gif',
  'https://i.imgur.com/Dju2eXM.gif',
  'https://i.imgur.com/n6wZnGl.gif',
  'https://i.imgur.com/CVUphvB.gif',
  'https://i.imgur.com/vH8Kmss.gif',
  'https://i.imgur.com/qvYl32N.gif',
];

module.exports = new Command({
  name: 'highfive',
  description: 'let your buddies know what they did was awesome! :grin:',
  args: {
    target: 'string',
  },
  delete: true,
  category: 'interactions',
  usage: '{target}',
  examples: ['@Kaffe#9547', '@blu#0111'],
  async run(bot, message, meta) {
    // const {args} = meta;
    const highfive = createInteractionCommand(
      `\n${meta.tag} has high-fived you :raised_hand: :pray: good job, on whatever you did to deserve a high-five :grin:`,
      random(images),
      message,
    );

    highfive().catch((err) => this.client.emit('error', err));
  },
});
