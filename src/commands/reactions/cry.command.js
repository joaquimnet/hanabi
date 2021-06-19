const { Command } = require('sensum');

const makeEmbed = require('../../util/makeEmbed');
const findPerson = require('../../util/findPerson');
// const Gifs = require('../../services/gifs');
const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

const images = [
  'https://i.imgur.com/5eCOs01.gif',
  'https://i.imgur.com/f2b05ZA.gif',
  'https://i.imgur.com/rItHol1.gif',
  'https://i.imgur.com/XpuUWZC.gif',
  'https://i.imgur.com/XmcL1No.gif',
  'https://i.imgur.com/OlMnPiW.gif',
  'https://i.imgur.com/sbBZEPe.gif',
  'https://i.imgur.com/fs72Cup.gif',
  'https://i.imgur.com/2OgtJfc.gif',
  'https://i.imgur.com/YiobK86.gif',
  'https://i.imgur.com/nVSBQuw.gif',
  'https://i.imgur.com/KFsUfgh.gif',
  'https://i.imgur.com/RV7rPtb.gif',
  'https://i.imgur.com/s6xSu5O.gif',
  'https://i.imgur.com/8knbDRc.gif',
  'https://i.imgur.com/pgSiHl9.gif',
  'https://i.imgur.com/9U2JOv5.gif',
  'https://i.imgur.com/vuLqkS9.gif',
  'https://i.imgur.com/KeQE5fz.gif',
  'https://i.imgur.com/lyJ1JnM.gif',
  'https://i.imgur.com/HXk2Cz9.gif',
];

module.exports = new Command({
  name: 'cry',
  description: 'sometimes.. you just gotta cry it out',
  aliases: ['sob', 'tear', 'sad'],
  category: 'reactions',
  examples: [' ', '@Kaffe#9547', 'blu#0111'],
  async run(bot, message, meta) {
    const target = await findPerson(message.mentions.members.first());

    let cryingMessage;
    if (target) {
      // Peepeepoopoo 👁‍🗨 ✔✔✔✔
      cryingMessage = `${target} made <@${meta.userId}> cry, what did you do? :'c `;
    } else {
      cryingMessage = `<@${meta.userId}>'s crying :'(`;
    }

    const embed = makeEmbed(
      cryingMessage,
      // await Gifs.random('cry'),
      random(images),
      message,
    );

    this.send({ embed });
  },
});
