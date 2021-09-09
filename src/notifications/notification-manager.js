const NotificationModelV1 = require('./notification.model.v1');
const Notification = require('./notification');

class NotificationManager {
  constructor(bot) {
    this.bot = bot;
  }

  async create(notification) {
    if (!(notification instanceof Notification)) {
      throw new Error('Notification must be an instance of Notification');
    }

    const doc = new NotificationModelV1(notification);

    await doc.save();
    return notification;
  }

  async touch(userId) {
    const notifications = await NotificationModelV1.find({
      $or: [
        { userId, sendAt: { $lt: new Date() } },
        {
          userId: 'global',
          readBy: { $nin: userId },
          sendAt: { $lt: new Date() },
        },
      ],
    }).sort('createdAt');

    return notifications;
  }

  async consume(userId) {
    const notifications = await this.touch(userId);
    this.bot.logger.info(
      `Consuming ${notifications.length} notifications for user ${userId}`,
    );

    await Promise.all([
      NotificationModelV1.updateMany(
        {
          userId: 'global',
          readBy: { $nin: userId },
          sendAt: { $lt: new Date() },
        },
        { $push: { readBy: userId } },
      ),
      NotificationModelV1.deleteMany({ userId, sendAt: { $lt: new Date() } }),
    ]);

    return notifications;
  }

  async flush(userId) {
    await NotificationModelV1.deleteMany({ userId });
  }

  async send(channel, userId, consume = true) {
    if (!channel) return;

    const notifications = await this.touch(userId);

    for (const notification of notifications) {
      try {
        const embed = {
          image: { url: notification.image },
        };
        await channel.send({ embed });
      } catch (err) {
        this.bot.emit(
          'warn',
          `Could not send notification "${notification.title}" to channel ${channel?.id}`,
        );
        this.bot.emit('warn', err);
      }
    }
    if (consume) await this.consume(userId);
  }
}

module.exports = NotificationManager;
