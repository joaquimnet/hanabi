const { EventHandler } = require('sensum');

module.exports = new EventHandler({
  name: 'command',
  run(bot, ctx) {
    ctx.message.client.logger.info(
      ctx.tag,
      `(${ctx.guild?.name ?? 'DM'}) ->`,
      ctx.commandName,
    );

    if (ctx.commandName === 'help') {
      bot.achievements.progress({
        achievementGroup: require('../achievements/help-command/group'),
        progressAmount: 1,
        profile: ctx.profile,
        channel: ctx.message.channel,
      });
    }
  },
});
