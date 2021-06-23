const { EventHandler } = require('sensum');

const commandMetricQueue = require('./command-metric-queue');

module.exports = new EventHandler({
  name: 'command',
  run(bot, ctx) {
    commandMetricQueue.enqueue({
      userId: ctx.userId,
      channelId: ctx.message.channel.id,
      guildId: ctx.message.guild?.id,
      command: ctx.commandName,
      args: ctx.cliArgs._,
      time: new Date(),
    });
  },
});
