const { Command } = require('sensum');

const makeEmbed = require('../../util/makeEmbed');
const findPerson = require('../../util/findPerson');
//const Gifs = require('../../services/gifs');
const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

const images = [
  'https://i.imgur.com/3bQ5hqy.gif',
  'https://i.imgur.com/MN9si0m.gif',
  'https://i.imgur.com/DEtN7dV.gif',
  'https://i.imgur.com/Rot43Y4.gif',
  'https://i.imgur.com/KSTgbZW.gif',
  'https://i.imgur.com/AVv17al.gif',
  'https://i.imgur.com/CfkDtJM.gif',
  'https://i.imgur.com/oSSKB8C.gif',
  'https://i.imgur.com/0Hq3LDr.gif',
  'https://i.imgur.com/3NrZwpK.gif',
  'https://i.imgur.com/8WZwOQC.gif',
  'https://i.imgur.com/LocQCNI.gif',
];

module.exports = new Command({
  name: 'coffee',
  description: 'A cup of coffee to boost your spirits. ;)',
  aliases: ['kaffe'],
  category: 'reactions',
  examples: [' ', '@Kaffe#9547', '@blu#0111'],
  async run(bot, message, meta) {
    const target = await findPerson(message.mentions.members.first());

    let msg;
    if (target) {
      msg = `<@${meta.userId}> is drinking a cup of coffee. Would you like one too, ${target}? :coffee:`;
    } else {
      msg = `<@${meta.userId}>'s drinking a cup of coffee :coffee: `;
    }

    const embed = makeEmbed(
      msg,
      // await Gifs.random(['coffee']),
      random(images),
      message,
    );

    this.send({ embed });
  },
});
