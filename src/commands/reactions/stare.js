const { Command } = require('@ponatech/bot');

const makeEmbed = require('../../util/makeEmbed');
const findPerson = require('../../util/findPerson');

const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

const images = [
  'https://i.imgur.com/KvxQJuH.gif',
  'https://i.imgur.com/HHiDj8y.gif',
  'https://i.imgur.com/cEt8Q8k.gif',
  'https://i.imgur.com/jTPVwjk.gif',
  'https://i.imgur.com/17XUE3u.gif',
  'https://i.imgur.com/Do2bdBY.gif',
  'https://i.imgur.com/l2O4xEA.gif',
  'https://i.imgur.com/byL7SwW.gif',
  'https://i.imgur.com/7IM190G.gif',
  'https://i.imgur.com/P7nMpyw.gif',
  'https://i.imgur.com/le0X3Ek.gif',
  'https://i.imgur.com/EtAzbhA.gif',
  'https://i.imgur.com/FXwe7P7.gif',
  'https://i.imgur.com/P3G2f2c.gif',
  'https://i.imgur.com/O4Bpdfm.gif',
  'https://i.imgur.com/EaShbjl.gif',
  'https://i.imgur.com/VKKkE9B.gif',
  'https://i.imgur.com/1kbMlxS.gif',
  'https://i.imgur.com/0pevT2O.gif',
  'https://i.imgur.com/nxZgN08.gif',
  'https://i.imgur.com/atc6cQi.gif',
  'https://i.imgur.com/7EVhWTt.gif',
];

const deleteAfterDelay = (bot, msg, delay) => {
  bot.setTimeout(() => {
    msg.delete().catch(() => {});
  }, delay);
};

module.exports = new Command({
  name: 'stare',
  description: 'o-o',
  args: ['target'],
  aliases: ['glare'],
  //  ¯\_(ツ)_/¯
  category: 'reactions',
  examples: ['@Kaffe#9547', '@blu#0111'],
  async run(bot, message, meta) {
    const target = await findPerson(message.mentions.members.first());

    if (!target) {
      const msg = await message.channel
        .send("I couldn't find that person.")
        .catch(() => {});
      deleteAfterDelay(bot, msg, 3000);
      return;
    }

    const embed = makeEmbed(
      `<@${meta.userId}> is staring at you ${target}... what did you do?`,
      random(images),
      message,
    );

    this.send({ embed });
  },
});
