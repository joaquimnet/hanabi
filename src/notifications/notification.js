class Notification {
  constructor({
    userId,
    title = 'New Notification',
    description = 'This is a new notification.',
    thumbnail = undefined,
    image = undefined,
    color,
    tags = [],
    deleteAt,
  }) {
    if (!userId) throw new Error('Notifications require a userId.');
    if (!title) throw new Error('Notifications require a title.');
    if (!description) throw new Error('Notifications require a description.');
    this.userId = userId;
    this.title = title;
    this.description = description;
    this.thumbnail = thumbnail;
    this.image = image;
    this.color = color;
    this.tags = tags;
    this.deleteAt = deleteAt;
  }
}

module.exports = Notification;
