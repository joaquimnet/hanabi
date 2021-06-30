const { Command, Permission } = require('sensum');

const Notification = require('../../notifications/notification');

module.exports = new Command({
  name: 'notification-admin',
  description: 'COmmand to test notifications.',
  category: 'maintenance',
  aliases: ['nadmin'],
  args: {
    operation: 'string',
    userId: 'string',
    color: { type: 'string', optional: true },
  },
  delete: false,
  hidden: true,
  permission: Permission.BOT_ADMIN,
  async run(bot, message, ctx) {
    if (ctx.args.operation === 'read') {
      const notification = await bot.notifications.touch(ctx.args.userId);
      this.send(
        bot.lines('```json', JSON.stringify(notification, null, 2), '```'),
      );
      return;
    }

    if (ctx.args.operation === 'consume') {
      const notification = await bot.notifications.consume(ctx.args.userId);
      this.send(
        bot.lines('```json', JSON.stringify(notification, null, 2), '```'),
      );
      return;
    }

    if (ctx.args.operation === 'send') {
      const notification = await bot.notifications.create(
        new Notification({
          userId: ctx.args.userId,
          title: 'Test notification',
          description: ctx.content,
          color: ctx.args.color ? bot.colorInt(ctx.args.color) : undefined,
          tags: ['test'],
        }),
      );
      this.send(
        bot.lines('```json', JSON.stringify(notification, null, 2), '```'),
      );
      return;
    }

    this.send("That's not a valid operation!");
  },
});
