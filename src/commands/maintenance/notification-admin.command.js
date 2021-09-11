const { Command, Permission } = require('sensum');

const Notification = require('../../framework/notifications/notification');

module.exports = new Command({
  name: 'notification-admin',
  description: 'Command to test notifications.',
  category: 'maintenance',
  aliases: ['nadmin'],
  args: {
    operation: 'string',
    userId: 'string',
    image: { type: 'string', optional: true },
    sendAt: { type: 'date', convert: true, optional: true },
    expireAt: { type: 'date', convert: true, optional: true },
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
        bot.lines('```json\n', JSON.stringify(notification, null, 2), '```'),
      );
      return;
    }

    if (ctx.args.operation === 'send') {
      const notification = await bot.notifications.create(
        new Notification({
          userId: ctx.args.userId,
          image: ctx.args.image,
          sendAt: ctx.args.sendAt,
          expireAt: ctx.args.expireAt,
        }),
      );
      await this.send(
        bot.lines('```json', JSON.stringify(notification, null, 2), '```'),
      );
      return;
    }

    this.send("That's not a valid operation!");
  },
});
