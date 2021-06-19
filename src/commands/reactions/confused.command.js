const { Command } = require('sensum');

const makeEmbed = require('../../util/makeEmbed');
const findPerson = require('../../util/findPerson');
//const Gifs = require('../../services/gifs');
const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

const images = [
  'https://i.imgur.com/Tx7dExf.gif',
  'https://i.imgur.com/TUyG4tp.gif',
  'https://i.imgur.com/AcOHsN9.gif',
  'https://i.imgur.com/CTmCNe6.gif',
  'https://i.imgur.com/ren9Rp3.gif',
  'https://i.imgur.com/pDssR1v.gif',
  'https://i.imgur.com/H3zkSRj.gif',
  'https://i.imgur.com/eLHLoHj.gif',
  'https://i.imgur.com/GqLvQ9F.gif',
  'https://i.imgur.com/mLcmX7s.gif',
  'https://i.imgur.com/l66kNS0.gif',
  'https://i.imgur.com/ALM0YwE.gif',
  'https://i.imgur.com/IDPECL7.gif',
  'https://i.imgur.com/a5LtRPo.gif',
  'https://i.imgur.com/gaLBnw2.gif',
  'https://i.imgur.com/7b3IBFe.gif',
  'https://i.imgur.com/93N5jQ1.gif',
  'https://i.imgur.com/cymMijO.gif',
  'https://i.imgur.com/IUdd7O9.gif',
  'https://i.imgur.com/iTbpYi1.gif',
];

module.exports = new Command({
  name: 'confused',
  description: "ever feel like you don't understand what's going on?",
  aliases: ['confuse', 'huh', 'confusion'],
  category: 'reactions',
  examples: [' ', '@Kaffe#9547', '@blu#0111'],
  async run(bot, message, meta) {
    const target = await findPerson(message.mentions.members.first());

    let msg;
    if (target) {
      msg = `<@${meta.userId}> is confused by what you said, ${target} Maybe try clarifying a little more?`;
    } else {
      msg = `<@${meta.userId}> is **confused** :thinking:`;
    }

    const embed = makeEmbed(
      msg,
      // await Gifs.random(['confused']),
      random(images),
      message,
    );

    this.send({ embed });
  },
});
