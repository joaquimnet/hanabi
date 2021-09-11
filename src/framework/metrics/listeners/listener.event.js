const { EventHandler } = require('sensum');

const listenerMetricQueue = require('./listener-metric-queue');

module.exports = new EventHandler({
  name: 'listener',
  async run(bot, listener, ctx) {
    listenerMetricQueue.enqueue({
      userId: ctx.userId,
      channelId: ctx.message.channel.id,
      guildId: ctx.message.guild?.id,
      listener: listener.makeName(),
      category: listener.category,
      message: ctx.message.content,
      time: new Date(),
    });
    try {
      await bot.achievements.progress({
        achievementGroup: require('../../../achievements/any-listener/group'),
        progressAmount: 1,
        profile: ctx.profile,
        channel: ctx.message.channel,
      });
    } catch (err) {
      bot.emit('error', err);
    }
  },
});
