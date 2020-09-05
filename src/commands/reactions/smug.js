const { Command } = require('@ponatech/bot');

const makeEmbed = require('../../util/makeEmbed');
const findPerson = require('../../util/findPerson');
//const Gifs = require('../../services/gifs');
const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

const images = [
  'https://i.imgur.com/QJ8G6BT.gif',
  'https://i.imgur.com/ZB0Qtzv.gif',
  'https://i.imgur.com/Lg5GAdx.gif',
  'https://i.imgur.com/tXcnDBR.gif',
  'https://i.imgur.com/rwWYh4N.gif',
  'https://i.imgur.com/1iKWD8M.gif',
  'https://i.imgur.com/8xx4KcM.gif',
  'https://i.imgur.com/8EivliU.gif',
  'https://i.imgur.com/EtV5J8i.gif',
  'https://i.imgur.com/1x04XzU.gif',
  'https://i.imgur.com/Cgg69Dw.gif',
  'https://i.imgur.com/gqu0TWS.gif',
  'https://i.imgur.com/887oXef.gif',
  'https://i.imgur.com/Ile4uFq.gif',
  'https://i.imgur.com/AwKZKp1.gif',
  'https://i.imgur.com/zArFlXU.gif',
  'https://i.imgur.com/VemkCOx.gif',
  'https://i.imgur.com/vT23L7s.gif',
];

module.exports = new Command({
  name: 'smug',
  description: 'teehee gottem~',
  // args: ['target'],
  aliases: [],
  category: 'reactions',
  examples: [' ', '@Kaffe#9547', '@blu#0111'],
  async run(bot, message, meta) {
    const target = await findPerson(message.mentions.members.first());

    let cryingMessage;
    if (target) {
      cryingMessage = `<@${meta.userId}> is smug. How do you feel ${target}? ~`;
    } else {
      cryingMessage = `<@${meta.userId}> is feeling awfully smug ~ `;
    }
    // bruh what THE FUCK IS UP KYLE?
    // ??????????????????????????????????????????????
    const embed = makeEmbed(
      cryingMessage,
      //await Gifs.random('smug'),
      random(images),
      message,
    );

    this.send({ embed });
  },
});
