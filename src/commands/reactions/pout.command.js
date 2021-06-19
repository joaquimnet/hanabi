const { Command } = require('sensum');

const makeEmbed = require('../../util/makeEmbed');
const findPerson = require('../../util/findPerson');
//const Gifs = require('../../services/gifs');
const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

const images = [
  'https://i.imgur.com/T2fx5NT.gif',
  'https://i.imgur.com/4uDloXs.gif',
  'https://i.imgur.com/AOVTcMv.gif',
  'https://i.imgur.com/vU4fpvj.gif',
  'https://i.imgur.com/FoCzwBi.gif',
  'https://i.imgur.com/Y6Go6wK.gif',
  'https://i.imgur.com/UBglQ2A.gif',
  'https://i.imgur.com/zAiIL7h.gif',
  'https://i.imgur.com/xtgrpDv.gif',
  'https://i.imgur.com/MRPxbCC.gif',
  'https://i.imgur.com/afPiV2B.gif',
  'https://i.imgur.com/VZfFGgg.gif',
  'https://i.imgur.com/xvdy58e.gif',
  'https://i.imgur.com/NGwMBU0.gif',
  'https://i.imgur.com/jdsNpzn.gif',
  'https://i.imgur.com/s0mCwxX.gif',
];

module.exports = new Command({
  name: 'pout',
  description: 'For when someone is just being a baka.',
  // aliases: [],
  category: 'reactions',
  examples: [' ', '@Kaffe#9547', '@blu#0111'],
  delete: true,
  async run(bot, message, meta) {
    const target = await findPerson(message.mentions.members.first());

    let msg;
    if (target) {
      msg = `<@${meta.userId}> is pouting at ${target}. Whatever you do.. :pleading_face: *don't* give in.`;
    } else {
      msg = `<@${meta.userId}>'s pouting :pleading_face: `;
    }

    const embed = makeEmbed(msg, random(images), message);

    this.send({ embed });
  },
});
