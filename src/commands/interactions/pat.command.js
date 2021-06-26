const { Command } = require('sensum');
const createInteractionCommand = require('../../util/createInteractionCommand');

const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
const images = [
  'https://i.imgur.com/u5c5VrI.gif',
  'https://i.imgur.com/WdscHzC.gif',
  'https://i.imgur.com/53lPGJo.gif',
  'https://i.imgur.com/Z1lZcGF.gif',
  'https://i.imgur.com/jG2ivO2.gif',
  'https://i.imgur.com/wQZoh85.gif',
  'https://i.imgur.com/mWANPlO.gif',
  'https://i.imgur.com/AvYDjtg.gif',
  'https://i.imgur.com/eFtCXA6.gif',
  'https://i.imgur.com/gvRsBCY.gif',
  'https://i.imgur.com/vvsLNWn.gif',
  'https://i.imgur.com/wGp3QK0.gif',
  'https://i.imgur.com/VK4IcCU.gif',
  'https://i.imgur.com/UX0Cy43.gif',
  'https://i.imgur.com/wOJCxDX.gif',
  'https://i.imgur.com/jVXiEDE.gif',
  'https://i.imgur.com/yj2oEYx.gif',
];

module.exports = new Command({
  name: 'pat',
  description: 'a gentle way of saying.. there-there.',
  aliases: ['pet'],
  args: {
    target: 'string',
  },
  delete: true,
  category: 'interactions',
  usage: '{target}',
  examples: ['@Kaffe#9547', '@blu#0111'],
  hidden: true,
  async run(bot, message, meta) {
    const pat = createInteractionCommand(
      `*pat-pat* \n${meta.tag} has pat you c:`,
      random(images),
      message,
    );

    pat().catch((err) => this.client.emit('error', err));
  },
});
