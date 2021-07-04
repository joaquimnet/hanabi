const NotificationModelV1 = require('../models/notification.model.v1');
const GlobalNotificationModelV1 = require('../models/notification-global.model.v1');
const Notification = require('./notification');

class NotificationManager {
  constructor(bot) {
    this.bot = bot;
  }

  async create(notification) {
    if (!(notification instanceof Notification)) {
      throw new Error('Notification must be a Notification');
    }

    let doc;
    if (notification.userId === 'global') {
      doc = new GlobalNotificationModelV1(notification);
    } else {
      doc = new NotificationModelV1(notification);
    }

    await doc.save();
    return notification;
  }

  async touch(userId) {
    const [docs, globals] = await Promise.all([
      await NotificationModelV1.find({ userId }),
      GlobalNotificationModelV1.find({
        readBy: { $nin: userId },
        ttl: { $gt: new Date() },
      }),
    ]);

    const notifications = docs.concat(globals);
    notifications.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    return notifications;
  }

  async consume(userId) {
    const [docs, globals] = await Promise.all([
      await NotificationModelV1.find({ userId }),
      GlobalNotificationModelV1.find({
        readBy: { $nin: userId },
      }),
    ]);

    await Promise.all([
      GlobalNotificationModelV1.updateMany(
        {
          readBy: { $nin: userId },
        },
        { $push: { readBy: userId } },
      ),
      NotificationModelV1.deleteMany({ userId }),
    ]);

    const notifications = docs.concat(globals);
    notifications.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    return notifications;
  }

  async flush(userId) {
    await NotificationModelV1.deleteMany({ userId });
  }

  async send(channel, userId) {
    if (!channel) return;

    const notifications = await this.touch(userId);

    for (const notification of notifications) {
      try {
        if (notification.thumbnail || notification.color) {
          const embed = {
            ...notification.toObject(),
            thumbnail: { url: notification.thumbnail },
            image: { url: notification.image },
          };
          await channel.send({ embed });
        } else {
          await channel.send(
            this.bot.lines(
              `**${notification.title}**`,
              notification.description,
            ),
          );
        }
        await this.consume(userId);
      } catch (err) {
        this.bot.emit(
          'warn',
          `Could not send notification "${notification.title}" to channel ${channel?.id}`,
        );
        this.bot.emit('warn', err);
      }
    }
  }
}

module.exports = NotificationManager;
