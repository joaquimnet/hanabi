const { EventHandler } = require('sensum');

module.exports = new EventHandler({
  name: 'warn',
  run(bot, err) {
    bot.logger.error(err);
  },
});
