class Notification {
  constructor({ userId, image, expireAt, sendAt }) {
    if (!userId) throw new Error('Notifications require a userId.');
    if (!image) throw new Error('Notifications require a image.');
    this.userId = userId;
    this.image = image;
    this.expireAt = expireAt;
    this.sendAt = sendAt;
  }
}

module.exports = Notification;
