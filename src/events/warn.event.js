const { EventHandler } = require('sensum');

module.exports = new EventHandler({
  name: 'warn',
  run(bot, err) {
    bot.logger.error(err);
    bot.alerts
      .sendWarn({
        title: 'Warning ⚠',
        message:
          `**${err.message ?? err}**\n\nenv: ${process.env.NODE_ENV}\n\n` +
            '```\n' +
            err.stack ?? null + '```',
        thumbnail:
          'https://img.freepik.com/free-vector/warning-sign-black-background_97458-374.jpg?size=626&ext=jpg',
      })
      .catch(() => {
        bot.logger.error('Could not send error alert to Dev Server.');
      });
  },
});
