const { Command } = require('sensum');

const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

module.exports = new Command({
  name: 'pickmessage',
  description: 'Picks a random message in a channel.',
  category: 'other',
  aliases: ['pickmsg'],
  args: { limit: { type: 'number', convert: true, default: 50, max: 100 } },
  delete: false,
  // hidden: true,
  async run(bot, message, ctx) {
    const messagesInChannel = await message.channel.messages.fetch({
      limit: ctx.args.limit,
      before: message.id,
    });

    const messages = [
      ...messagesInChannel
        .array()
        .map((m) => `**${m.author.tag}:** ${m.content}`),
    ];

    let msg = await this.send(
      `:page_facing_up: **| ${message.author.username}** asked me to pick a random message from here.\n:1234: And I pick`,
    );
    await bot.wait(200);
    msg = await msg.edit(`${msg.content}.`);
    await bot.wait(200);
    msg = await msg.edit(`${msg.content}.`);
    await bot.wait(200);
    msg = await msg.edit(`${msg.content}.`);
    await bot.wait(200);
    // eslint-disable-next-line no-unused-vars
    msg = await msg.edit(bot.lines(msg.content, random(messages)));
  },
});
