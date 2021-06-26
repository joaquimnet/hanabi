const { Command } = require('sensum');

const createInteractionCommand = require('../../util/createInteractionCommand');

const randomNum = () => Math.floor(Math.random() * 71);

module.exports = new Command({
  name: 'kiss',
  description:
    'Chu~ :3 :kissing_heart:',
  args: {
    target: 'string',
  },
  delete: true,
  category: 'interactions',
  usage: '{target}',
  examples: ['@Kaffe#6969', '@blu#0111'],
  run(bot, message, meta) {
    const hug = createInteractionCommand(
      `\n${meta.tag} has given you a kiss, oh my! :flushed: `,
      `http://img.assets.work/kiss/${randomNum()}.gif`,
      message,
    );

    hug().catch((err) => bot.emit('error', err));
  },
});
