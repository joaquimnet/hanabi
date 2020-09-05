const { Command } = require('@ponatech/bot');

const makeEmbed = require('../../util/makeEmbed');
const findPerson = require('../../util/findPerson');

const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

const images = [
  'https://i.imgur.com/jSQz6P1.gif',
  'https://i.imgur.com/rf5tUtb.gif',
  'https://i.imgur.com/Ub8i8z8.gif',
  'https://i.imgur.com/EwAe7PW.gif',
  'https://i.imgur.com/KzkbstA.gif',
  'https://i.imgur.com/NBNNVww.gif',
  'https://i.imgur.com/U0wVz4j.gif',
  'https://i.imgur.com/YF1yZSX.gif',
  'https://i.imgur.com/BSMzXdQ.gif',
  'https://i.imgur.com/pEXULlx.gif',
  'https://i.imgur.com/gXdHmuF.gif',
  'https://i.imgur.com/nQVIjTT.gif',
  'https://i.imgur.com/VYjSVU1.gif',
  'https://i.imgur.com/Dq4afEA.gif',
  'https://i.imgur.com/uxf1Cp8.gif',
  'https://i.imgur.com/JuogUfl.gif',
];

module.exports = new Command({
  name: 'angry',
  description: '*stare* who made you mad?',
  aliases: ['mad'],
  category: 'reactions',
  usage: '[target]',
  examples: [' ', '@Kaffe#9547', '@blu#0111'],
  async run(bot, message, meta) {
    const target = await findPerson(message.mentions.members.first());

    let msg;
    if (target) {
      msg = `<@${meta.userId}> is currently mad at ${target}. I suggest everyone steering clear of the two.`;
    } else {
      msg = `<@${meta.userId}>'s ears are steaming... Who upset them?`;
    }

    // const embed = makeEmbed(msg, await Gifs.random(['blush']), message);
    const embed = makeEmbed(msg, random(images), message);

    this.send({ embed });
  },
});
