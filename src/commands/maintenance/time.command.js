const { Command, Permission } = require('sensum');
const { MessageEmbed } = require('discord.js');

const Time = require('../../services/time.service');

module.exports = new Command({
  name: 'time',
  description: 'Parse timing into cron and back.',
  category: 'admin',
  args: {
    time: { type: 'any', default: new Date() },
  },
  permission: Permission.BOT_ADMIN,
  hidden: true,
  run(bot, message, ctx) {
    const { cron, human, original, relative, duration } = Time.parse(
      ctx.contentFull || ctx.args.time,
    );

    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

    this.send({
      embed: new MessageEmbed({
        title: 'Timing Parser',
        fields: [
          { inline: true, name: 'Original', value: original },
          { inline: true, name: 'Cron Expression', value: cron },
          { inline: true, name: 'Human Readable', value: human },
          { inline: true, name: 'Relative Time', value: relative },
          {
            inline: true,
            name: 'Duration',
            value: duration + ` (${Time.fromNow(duration / 1000)})`,
          },
          {
            inline: true,
            name: 'Calendar',
            value: duration + ` (${Time.calendarFromNow(duration / 1000)})`,
          },
        ],
      }),
    });
  },
});
