const { Command } = require('sensum');
const moment = require('moment');

const Time = require('../../framework/time/time.service');
const Reminder = require('../../models/reminder');
const Reminders = require('../../framework/reminders/reminders.service');

module.exports = new Command({
  name: 'remind',
  description: 'Set a reminder for yourself!',
  category: 'other',
  aliases: ['reminder', 'timer'],
  args: {
    time: 'string',
    message: {
      type: 'string',
      optional: true,
    },
  },
  // HOW TO SEND REMIND IN DMS
  runIn: ['dm', 'text'],
  delete: false,
  hidden: false,
  usage: '{time} [your reminder]',
  examples: [
    '2h go have lunch',
    '1d go talk to blu',
    '6d homework due tomorrow',
    '20min time to go get the laundry',
  ],
  async run(bot, message, ctx) {
    const { duration } = Time.parse(ctx.args.time);

    if (!duration) {
      await this.send(
        `That's not a valid timeframe, try using **${bot.config.defaultSettings.prefix}help remind** for command usage and examples.`,
      );
      return;
    }

    const content = ctx.cliArgs._.slice(1).join(' ').trim() || 'this moment';
    const userId = message.author.id;
    const userTag = message.author.tag;
    const channelId = message.channel.id;
    // conditional chaining (?)
    const guildId = message.guild?.id ?? 'none';
    const fireDate = moment()
      .utc()
      .add(duration / 1000, 'seconds');

    const reminder = new Reminder({
      content,
      userId,
      userTag,
      channelId,
      guildId,
      fireDate,
    });

    await reminder.save();

    Reminders.scheduleReminder(bot, reminder);

    this.send(
      `Okay! I'll remind you **${Time.fromNow(
        duration / 1000,
      )}** (${fireDate.calendar()}) about "${content}" ${message.author}`,
    );
  },
});
