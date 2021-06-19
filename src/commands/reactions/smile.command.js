const { Command } = require('sensum');

const makeEmbed = require('../../util/makeEmbed');
const findPerson = require('../../util/findPerson');

const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

const images = [
  'https://i.imgur.com/jFJdIR6.gif',
  'https://i.imgur.com/swfr46f.gif',
  'https://i.imgur.com/E4AcysQ.gif',
  'https://i.imgur.com/I8UXMg3.gif',
  'https://i.imgur.com/cLXrMeo.gif',
  'https://i.imgur.com/tprWztz.gif',
  'https://i.imgur.com/0ZgZdiI.gif',
  'https://i.imgur.com/bBR33dQ.gif',
  'https://i.imgur.com/tt7sScf.gif',
  'https://i.imgur.com/JUZNs37.gif',
  'https://i.imgur.com/QasH4WB.gif',
  'https://i.imgur.com/8ftXOUF.gif',
  'https://i.imgur.com/S8NyOTC.gif',
  'https://i.imgur.com/aT3YL6o.gif',
  'https://i.imgur.com/7fyfev4.gif',
];

module.exports = new Command({
  name: 'smile',
  description: 'For when something good happens.',
  category: 'reactions',
  usage: '[target]',
  examples: [' ', '@Kaffe#9547', '@blu#0111'],
  async run(bot, message, meta) {
    const target = await findPerson(message.mentions.members.first());

    let msg;
    if (target) {
      msg = `<@${meta.userId}> is smiling, because of you ${target}.`;
    } else {
      msg = `<@${meta.userId}> is smilling, how joyful.`;
    }

    const embed = makeEmbed(msg, random(images), message);

    this.send({ embed });
  },
});
