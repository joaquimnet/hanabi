const { Command, Permission, TextHelpers } = require('sensum');

module.exports = new Command({
  name: 'purge',
  description: TextHelpers.lines(
    'Delete messages quickly and easily.',
    'You can delete messages by a specific user and you can also',
    'delete messages containing a specific word.',
    'Is = Specific word/phrase.',
    'Has = Flexible and will pick up on any message with the word given.',
  ),
  category: 'moderation',
  args: {
    amount: { type: 'number', convert: true, min: 1, max: 99 },
    user: { type: 'string', optional: true },
  },
  permission: Permission.MANAGE_MESSAGES,
  cooldown: 10,
  delete: true,
  hidden: false,
  examples: ['5', '15 user @[user]', '25 is [word]', '35 has [word]'],
  async run(bot, message, ctx) {
    const userMention = message.mentions.users.first();
    const messagesToDelete = [];

    const has = ctx.args.user === 'has' ? ctx.content.trim() : false;
    const is = ctx.args.user === 'is' ? ctx.content.trim() : false;

    if (has) {
      const messages = await message.channel.messages.fetch(
        { limit: 100, before: message.id },
        false,
        true,
      );
      for (const msg of messages.values()) {
        if (msg.content.includes(has) && msg.id !== message.id) {
          messagesToDelete.push(msg);
        }
        if (messagesToDelete.length === ctx.args.amount) {
          break;
        }
      }
      await message.channel.bulkDelete(messagesToDelete);

      const msg = await this.send(
        `I have removed ${messagesToDelete.length} messages for you`,
      );
      await bot.wait(5000);
      await msg.delete().catch(() => {});
      return;
    }

    if (is) {
      const messages = await message.channel.messages.fetch(
        { limit: 100, before: message.id },
        false,
        true,
      );
      for (const msg of messages.values()) {
        if (msg.content === is && msg.id !== message.id) {
          messagesToDelete.push(msg);
        }
        if (messagesToDelete.length === ctx.args.amount) {
          break;
        }
      }
      await message.channel.bulkDelete(messagesToDelete);

      const msg = await this.send(
        `I have removed ${messagesToDelete.length} messages for you`,
      );
      await bot.wait(5000);
      await msg.delete().catch(() => {});
      return;
    }

    if (userMention) {
      const messages = await message.channel.messages.fetch(
        { limit: 100, before: message.id },
        false,
        true,
      );
      for (const msg of messages.values()) {
        if (msg.author.id === userMention.id && msg.id !== message.id) {
          messagesToDelete.push(msg);
        }
        if (messagesToDelete.length === ctx.args.amount) {
          break;
        }
      }
      await message.channel.bulkDelete(messagesToDelete);

      const msg = await this.send(
        `I have removed ${messagesToDelete.length} messages for you`,
      );
      await bot.wait(5000);
      await msg.delete().catch(() => {});
    } else {
      // TODO:  && msg.id !== message.id
      await message.channel.bulkDelete(ctx.args.amount);
      const msg = await this.send(
        `I have removed ${ctx.args.amount} messages for you`,
      );
      await bot.wait(5000);
      await msg.delete().catch(() => {});
    }
  },
});
/* \!purge 5 <= does not count as one of the 5
    (deletes 5 previous msgs before command)
   => "I have removed the messages for you" -delete this message after 5 seconds

  =>  \!purge 5 @kaffe => read messages to find last 5 messages from user, then proceed to delete JUST the users messages. <=
blu
kaffe 1 -- delete
blu 
kaffe 2
kaffe 3
blu
kaffe 4 
blu 
kaffe 5 
>only deletes kaffes messages. 
*/
