const { Command } = require('sensum');

const makeEmbed = require('../../util/makeEmbed');
const findPerson = require('../../util/findPerson');

const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

const images = [
  'https://i.imgur.com/8JnbAQE.gif',
  'https://i.imgur.com/lfHtick.gif',
  'https://i.imgur.com/Y4dJGCD.gif',
  'https://i.imgur.com/yaT3BNl.gif',
  'https://i.imgur.com/pK2JpPQ.gif',
  'https://i.imgur.com/M5EzAdf.gif',
  'https://i.imgur.com/RiGFh13.gif',
  'https://i.imgur.com/6SPfXPy.gif',
  'https://i.imgur.com/DgXfEN3.gif',
  'https://i.imgur.com/jE9Hio9.gif',
  'https://i.imgur.com/90fp3dd.gif',
  'https://i.imgur.com/8pjcQM2.gif',
  'https://i.imgur.com/LY9dGgw.gif',
  'https://i.imgur.com/l7qZn5e.gif',
  'https://i.imgur.com/ku3c8pZ.gif',
  'https://i.imgur.com/svFXUrK.gif',
];

module.exports = new Command({
  name: 'happy',
  description: "show that you're happy!",
  aliases: ['joy', 'content'],
  category: 'reactions',
  usage: '[target]',
  examples: [' ', '@Lar#9547', '@Xlilblu#5239'],
  delete: true,
  async run(bot, message, meta) {
    const target = await findPerson(message.mentions.members.first());

    let msg;
    if (target) {
      msg = `${target} has made <@${meta.userId}> happy!`;
    } else {
      msg = `<@${meta.userId}> seems to be really happy!`;
    }

    // const embed = makeEmbed(msg, await Gifs.random('happy'), message);
    const embed = makeEmbed(msg, random(images), message);

    this.send({ embed });
  },
});
