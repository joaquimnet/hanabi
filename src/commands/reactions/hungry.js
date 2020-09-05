const { Command } = require('@ponatech/bot');

const makeEmbed = require('../../util/makeEmbed');
const findPerson = require('../../util/findPerson');
const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

const images = [
  'https://i.imgur.com/DGnFo67.gif',
  'https://i.imgur.com/PqKTYzN.gif',
  'https://i.imgur.com/ZvVGPZa.gif',
  'https://i.imgur.com/iMZ55lJ.gif',
  'https://i.imgur.com/LxrOF80.gif',
  'https://i.imgur.com/QHUzdNi.gif',
  'https://i.imgur.com/GUrDk38.gif',
  'https://i.imgur.com/KYs5mYS.gif',
  'https://i.imgur.com/R3EExQj.gif',
  'https://i.imgur.com/5j6Mke6.gif',
  'https://i.imgur.com/balLZqg.gif',
  'https://i.imgur.com/W0b528Z.gif',
  'https://i.imgur.com/I76TV6k.gif',
  'https://i.imgur.com/nLrF9QI.gif',
  'https://i.imgur.com/HQCfE6j.gif',
  'https://i.imgur.com/uRURpGe.gif',
  'https://i.imgur.com/yxjypjv.gif',
  'https://i.imgur.com/troMcZT.gif',
  'https://i.imgur.com/HTsihyb.gif',
  'https://i.imgur.com/Jaon2AV.gif',
  'https://i.imgur.com/Eu8EeXk.gif',
  'https://i.imgur.com/3A0UP1T.gif',
  'https://i.imgur.com/bO7ZaiQ.gif',
];

module.exports = new Command({
  name: 'hungry',
  description: 'we all get a little hungry sometimes',
  aliases: ['starving', 'famished'],
  category: 'reactions',
  usage: '[target]',
  examples: [' ', '@Kaffe#9547', '@blu#0111'],
  async run(bot, message, meta) {
    const target = await findPerson(message.mentions.members.first());

    let msg;
    if (target) {
      msg = `<@${meta.userId}> wants to tell ${target} that they are very hungry. I suggest you feed them.`;
    } else {
      msg = `<@${meta.userId}> is saying that they're hungry! :fork_knife_plate: `;
    }
    //VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
    // const embed = makeEmbed(msg, random(images), message);
    const embed = makeEmbed(msg, random(images), message);

    this.send({ embed });
  },
});
