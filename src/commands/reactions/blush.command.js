const { Command } = require('sensum');

const makeEmbed = require('../../util/makeEmbed');
const findPerson = require('../../util/findPerson');

const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

const images = [
  'https://i.pinimg.com/originals/b7/4a/5b/b74a5b128b5d65ea1fdb9090c0b3f295.gif',
  'https://media1.tenor.com/images/daa09a16c31d2bc87d26188abdf9a273/tenor.gif?itemid=16552229',
  'https://i.imgur.com/hvbNFS8.gif',
  'https://i.imgur.com/78izCLu.gif',
  'https://i.imgur.com/8Vb9Jq0.gif',
  'https://i.imgur.com/ZRCdFCv.gif',
  'https://i.imgur.com/wVGSMVm.gif',
  'https://i.imgur.com/EW1XARu.gif',
  'https://i.imgur.com/W7zrMM6.gif',
  'https://i.imgur.com/Sh3AwZW.gif',
  'https://i.imgur.com/k0fgJOn.gif',
];

module.exports = new Command({
  name: 'blush',
  description: "~teehee you're looking awfully red~",
  aliases: ['embarrassed'],
  category: 'reactions',
  usage: '[target]',
  examples: [' ', '@Kaffe#9547', '@blu#0111'],
  async run(bot, message, meta) {
    const target = await findPerson(message.mentions.members.first());

    let msg;
    if (target) {
      msg = `<@${meta.userId}> is blushing because of ${target}.`;
    } else {
      msg = `<@${meta.userId}>'s blushing :flushed:`;
    }

    // const embed = makeEmbed(msg, await Gifs.random(['blush']), message);
    const embed = makeEmbed(msg, random(images), message);

    this.send({ embed });
  },
});
