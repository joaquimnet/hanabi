const {EventHandler} = require('sensum');
const { Settings } = require('../models');

const Reminder = require('../models/reminder');
const Time = require('../services/time.service');
const config = require('../db');
const Reminders = require('../services/reminders.service');

module.exports = new EventHandler({
  name: 'ready',
  run: async (bot) => {
    bot.logger.info('Logged into discord as', bot.user.tag);
    bot.logger.info(`Loaded ${bot.commands.size} commands.`);
    bot.logger.info(`Loaded ${bot.botListeners.size} listeners.`);
  
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
  }
});

function wait(milliseconds) {return new Promise((r) => setTimeout(r, milliseconds))}

function waitingForDb() {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve) => {
    while (!config.db()) {
      await wait(500);
    }
    resolve();
  });
}
