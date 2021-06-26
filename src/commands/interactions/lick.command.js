const { Command } = require('sensum');
const createInteractionCommand = require('../../util/createInteractionCommand');

const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
const images = [
  'https://i.imgur.com/NoPKH4z.gif',
  'https://i.imgur.com/lT1gQe5.gif',
  'https://i.imgur.com/PuPlvCV.gif',
  'https://i.imgur.com/ZbwIuBa.gif',
  'https://i.imgur.com/nDLkvzT.gif',
  'https://i.imgur.com/KfMSxRD.gif',
  'https://i.imgur.com/XWxkpgN.gif',
  'https://i.imgur.com/fRzJ1Ko.gif',
  'https://i.imgur.com/SVTMcFl.gif',
  'https://i.imgur.com/aa0Geqw.gif',
  'https://i.imgur.com/elmTjWn.gif',
];
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
      random(images),
      message,
    );
    // Kaffe: Stop dragging me I'm following you!😒👌
    lick().catch((err) => this.client.emit('error', err));
  },
});
