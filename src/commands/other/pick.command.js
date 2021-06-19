const { Command } = require('sensum');

const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

module.exports = new Command({
  name: 'pick',
  description:
    'Pick something from a set. Separate your options with a comma or every word will be a choice.',
  category: 'other',
  args: {
    choices: 'string',
  },
  usage: '[what to pick from]',
  aliases: ['choice'],
  examples: ['cookie cupcake milk', 'stay home, go outside'],
  async run(bot, message, ctx) {
    const { args } = ctx;
    let result;
    if (ctx.contentFull.includes(',')) {
      result = random(ctx.cliArgs._.join(' ').split(','));
    } else {
      result = random(ctx.cliArgs._);
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
