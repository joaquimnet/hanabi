const { EventHandler } = require('sensum');

module.exports = new EventHandler({
  name: 'warn',
  run(bot, err) {
    bot.logger.error(err);
    bot.alerts
      .sendWarn({
        title: 'Warning ⚠',
        message:
          '```' +
          JSON.stringify({ err, env: process.env.NODE_ENV }, null, 2) +
          '```',
        thumbnail:
          'https://img.freepik.com/free-vector/warning-sign-black-background_97458-374.jpg?size=626&ext=jpg',
      })
      .catch(() => {
        bot.logger.error('Could not send error alert to Dev Server.');
      });
  },
});
