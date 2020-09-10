const { Settings } = require('../models');

module.exports = (bot) => {
  bot.logger.info('Logged into discord as', bot.user.tag);
  bot.logger.info(`Loaded ${bot.commands.size} commands.`);
  bot.logger.info(`Loaded ${bot.botListeners.size} listeners.`);

  // add ignored channels saved in db to the ignore list
  Settings.loadIgnoreList(bot).then(([cCount, gCount]) => {
    bot.logger.info(
      `Listeners are ignoring ${cCount} channels and ${gCount} guilds.`,
    );
  });
};
