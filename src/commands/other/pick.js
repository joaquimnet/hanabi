const { Command } = require('@ponatech/bot');

const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

module.exports = new Command({
  name: 'pick',
  description:
    'Pick something from a set. Separate your options with a comma or every word will be a choice.',
  category: 'other',
  args: ['choice'],
  usage: '[what to pick from]',
  aliases: ['choice'],
  async run(bot, message, { args }) {
    let result;
    if (message.content.includes(',')) {
      result = random(args.join(' ').split(','));
    } else {
      result = random(args);
    }

    // msg is indeed being used. 🤦
    // eslint-disable-next-line no-unused-vars
    let msg = await this.send(
      `:page_facing_up: **| ${message.author.username}** asked me to pick something.\n:1234: And I pick`,
    );
    await bot.wait(200);
    msg = await msg.edit(`${msg.content}.`);
    await bot.wait(200);
    msg = await msg.edit(`${msg.content}.`);
    await bot.wait(200);
    msg = await msg.edit(`${msg.content}.`);
    await bot.wait(200);
    // eslint-disable-next-line no-unused-vars
    msg = await msg.edit(`${msg.content} **${result}**!!!`);
  },
});
