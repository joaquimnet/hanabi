const { Command } = require('sensum');
// const createInteractionCommand = require('../../util/createInteractionCommand');

const makeEmbed = require('../../util/makeEmbed');
const findPerson = require('../../util/findPerson');

const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
const images = [
  'https://i.imgur.com/fZGWVIp.gif',
  'https://i.imgur.com/ZQdvUn5.gif',
  'https://i.imgur.com/Ugg6Zbl.gif',
  'https://i.imgur.com/OaUv6P6.gif',
  'https://i.imgur.com/WPqn9lo.gif',
  'https://i.imgur.com/rzVorcN.gif',
  'https://i.imgur.com/qOYLvlK.gif',
  'https://i.imgur.com/zuYMdHq.gif',
  'https://i.imgur.com/fj3Elhu.gif',
  'https://i.imgur.com/5XfrKUQ.gif',
  'https://i.imgur.com/YB4BZVN.gif',
  'https://i.imgur.com/I1UG8gw.gif',
];

/*const deleteAfterDelay = (bot, msq, delay) => {
  bot.setTimeout(() => {
    msg.delete().catch(() => {});
  }, delay);
}; */

module.exports = new Command({
  name: 'tired',
  description: "For when you're sleepy, yanno? We all get sleepy.",
  aliases: ['sleepy', 'yawn'],
  delete: true,
  category: 'reactions',
  examples: ['@Kaffe#9547', 'blu#0111'],
  hidden: false,

  async run(bot, message, meta) {
    const target = await findPerson(message.mentions.members.first());

    let msg;
    if (target) {
      msg = `<@${meta.userId}> is informing ${target} that they are sleepy... They're barely keeping their eyes open! `;
    } else {
      msg = `<@${meta.userId}> is extremely sleepy. They should probably head to bed/take a nap soon.`;
    }

    const embed = makeEmbed(msg, random(images), message);

    this.send({ embed });
  },
});
