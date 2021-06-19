const { Command } = require('sensum');

const makeEmbed = require('../../util/makeEmbed');
const findPerson = require('../../util/findPerson');
//const Gifs = require('../../services/gifs');

const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

const images = [
  'https://i.imgur.com/O5jzbBw.gif',
  'https://i.imgur.com/u49ZKl9.gif',
  'https://i.imgur.com/i1F9uRe.gif',
  'https://i.imgur.com/GLI4Ggo.gif',
  'https://i.imgur.com/UsdPibc.gif',
  'https://i.imgur.com/PRi52gF.gif',
  'https://i.imgur.com/B6zg6zz.gif',
  'https://i.imgur.com/NVoyJAG.gif',
  'https://i.imgur.com/gdjVPeJ.gif',
  'https://i.imgur.com/TVZ3cKp.gif',
  'https://i.imgur.com/DFddxld.gif',
  'https://i.imgur.com/HGrOjLb.gif',
  'https://i.imgur.com/JUmbpQy.gif',
  'https://i.imgur.com/InENWM1.gif',
  'https://i.imgur.com/lN1tvTq.gif',
  'https://i.imgur.com/cUALGMg.gif',
  'https://i.imgur.com/WVBrMeW.gif',
  'https://i.imgur.com/ZN0c2Am.gif',
  'https://i.imgur.com/R7A2FXG.gif',
];
module.exports = new Command({
  name: 'laugh',
  description: 'Lmao! :laughing:',
  aliases: ['laughing', 'laughter'],
  category: 'reactions',
  examples: [' ', '@Kaffe#9547', '@blu#0111'],
  async run(bot, message, meta) {
    const target = await findPerson(message.mentions.members.first());

    let msg;
    if (target) {
      msg = `<@${meta.userId}> is laughing at ${target}. :laughing: How funny!`;
    } else {
      msg = `<@${meta.userId}>'s laughing :laughing: `;
    }

    const embed = makeEmbed(
      msg,
      //await Gifs.random('laugh'),
      random(images),
      message,
    );

    this.send({ embed });
  },
});
