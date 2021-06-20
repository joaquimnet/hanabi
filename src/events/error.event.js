const { EventHandler } = require('sensum');

module.exports = new EventHandler({
  name: 'error',
  run(bot, err) {
    bot.logger.error(err);
  },
});
