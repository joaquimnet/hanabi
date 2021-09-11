const { EventHandler } = require('sensum');

const commandMetricQueue = require('./command-metric-queue');

module.exports = new EventHandler({
  name: 'command',
  async run(bot, ctx) {
    commandMetricQueue.enqueue({
      userId: ctx.userId,
      channelId: ctx.message.channel.id,
      guildId: ctx.message.guild?.id,
      command: ctx.commandName,
      args: ctx.cliArgs._,
      time: new Date(),
    });
    try {
      await bot.achievements.progress({
        achievementGroup: require('../../achievements/any-command/group'),
        progressAmount: 1,
        profile: ctx.profile,
        channel: ctx.message.channel,
      });
    } catch (err) {
      bot.emit('error', err);
    }
  },
});
