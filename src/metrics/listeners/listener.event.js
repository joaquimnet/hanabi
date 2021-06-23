const { EventHandler } = require('sensum');

const listenerMetricQueue = require('./listener-metric-queue');

module.exports = new EventHandler({
  name: 'listener',
  run(bot, listener, ctx) {
    listenerMetricQueue.enqueue({
      userId: ctx.userId,
      channelId: ctx.message.channel.id,
      guildId: ctx.message.guild?.id,
      listener: listener.makeName(),
      category: listener.category,
      message: ctx.message.content,
      time: new Date(),
    });
  },
});
