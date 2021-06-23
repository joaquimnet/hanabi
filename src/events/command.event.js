const { EventHandler } = require('sensum');

module.exports = new EventHandler({
  name: 'command',
  run(bot, ctx) {
    ctx.message.client.logger.info(
      ctx.tag,
      `(${ctx.guild?.name ?? 'DM'}) ->`,
      ctx.commandName,
    );
  },
});
