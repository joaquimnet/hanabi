const { Task } = require('sensum');

const m = require('moment');
const moment = (...args) => m(...args).utc();

const Reminder = require('../models/reminder');

module.exports = class Reminders {
  static scheduleSavedReminders(bot, reminders) {
    for (const reminder of reminders) {
      Reminders.scheduleReminder(bot, reminder);
    }
  }

  static scheduleReminder(bot, reminder) {
    if (moment().isAfter(moment(reminder.fireDate))) {
      Reminders.sendReminder(bot, reminder);
    } else {
      bot.schedule.create(
        bot,
        new Task({
          name: `Reminder-${reminder.userId}-${reminder._id}`,
          time: reminder.fireDate,
          async run(bot) {
            Reminders.sendReminder(bot, reminder);
          },
        }),
      );
    }
  }

  static async sendReminder(bot, reminder) {
    const channel = await bot.channels.fetch(reminder.channelId);
    if (!channel) {
      // await dm();
    } else {
      await channel.send(
        formatReminderMessage(bot, reminder.content, reminder.userId, moment(reminder.createdAt).calendar())
      );
    }
    await reminder.delete().catch(() => {});
  }
};

function formatReminderMessage(bot, content, userId, date) {
  return bot.lines(
    `📆 **I have set your reminder!**`,
    content,
    `- <@${userId}>, ${date}`,
  )
}