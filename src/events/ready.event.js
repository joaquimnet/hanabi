const { EventHandler } = require('sensum');
const { Settings } = require('../models');

const Reminder = require('../models/reminder');
const config = require('../db');
const Reminders = require('../services/reminders.service');
const { waitingForDb } = require('../db');

module.exports = new EventHandler({
  name: 'ready',
  run: async (bot) => {
    bot.logger.info('Logged into discord as', bot.user.tag);
    bot.logger.info(`Loaded ${bot.commands.size} commands.`);
    bot.logger.info(`Loaded ${bot.botListeners.size} listeners.`);
    bot.logger.info(`Loaded ${bot.schedule.tasks.length} tasks.`);
    bot.logger.info(`Loaded ${bot.achievements.cache.size} achievements.`);

    // add ignored channels saved in db to the ignore list
    Settings.loadIgnoreList(bot).then(([cCount, gCount]) => {
      bot.logger.info(
        `Listeners are ignoring ${cCount} channels and ${gCount} guilds.`,
      );
    });

    if (!config.db()) {
      await waitingForDb();
    }

    const reminders = await Reminder.find({}).sort('fireDate');
    Reminders.scheduleSavedReminders(bot, reminders);
  },
});
