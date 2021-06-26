const { Command, Permission } = require('sensum');

const Time = require('../../services/time.service');
const guildReporter = require('../../metrics/reports/guild-reports');
const userReporter = require('../../metrics/reports/user-reports');
const ListenerUsageMetricV1 = require('../../metrics/listeners/listener-usage-metric.v1.model');
const CommandUsageMetricV1Model = require('../../metrics/commands/command-usage-metric.v1.model');
const Reporter = require('../../metrics/reports/reporter');

module.exports = new Command({
  name: 'active',
  description: 'Shows you the most active servers and users :3',
  category: 'info',
  args: {
    type: { type: 'enum', values: ['guild', 'user', 'server', 'global'] },
    timeRange: { type: 'enum', values: ['day', 'week', 'month', 'year'] },
  },
  delete: false,
  examples: [
    'server day',
    'server week',
    'server month',
    'server year',
    'user day',
    'user week',
    'user month',
    'user year',
  ],
  usage: '{type} {time range}',
  // hidden: true,
  // permission: Permission.BOT_SUPPORT,
  async run(bot, message, ctx) {
    try {
      const type = ctx.args.type;
      const timeRange = Time.moment()
        .startOf(ctx.args.timeRange)
        .startOf('day')
        .toDate();

      if (type === 'global') {
        const reporter = new Reporter([
          CommandUsageMetricV1Model,
          ListenerUsageMetricV1,
        ]);
        const [commandAggregation, listenerAggregation] =
          await reporter.countTotalEvents(timeRange);

        await this.send({
          embed: {
            title: `Here are some stats for ${
              ctx.args.timeRange === 'day'
                ? 'today'
                : 'this ' + ctx.args.timeRange
            }.`,
            fields: [
              { name: 'Command Usages', ...commandAggregation },
              { name: 'Listener Usages', ...listenerAggregation },
            ].map(({ name, count }) => ({
              name,
              value: count,
            })),
            color: bot.colorInt('#f0b7d3'),
            thumbnail: {
              url: 'https://i.imgur.com/3y7lKq8.png',
            },
          },
        });
        return;
      }

      const reporters = {
        user: userReporter,
        guild: guildReporter,
        server: guildReporter,
      };

      const [commandAggregation, listenerAggregation] = await reporters[
        type
      ].getByDate(timeRange);

      const isUser = type === 'user';

      const info = {};

      commandAggregation.forEach((a) => {
        const name = bot.config.owners.includes(message.author.id)
          ? bot[isUser ? 'users' : 'guilds'].cache.get(a._id)?.[
              isUser ? 'tag' : 'name'
            ] ?? '[not cached]'
          : '[redacted]';

        info[a._id] = {
          _id: a._id,
          name,
          commandUses: a.count,
          listenerUses: 0,
        };
      });
      listenerAggregation.forEach((a) => {
        const name = bot.config.owners.includes(message.author.id)
          ? bot[isUser ? 'users' : 'guilds'].cache.get(a._id)?.[
              isUser ? 'tag' : 'name'
            ] ?? '[not cached]'
          : '[redacted]';

        if (info[a._id]) {
          info[a._id].listenerUses = a.count;
        } else {
          info[a._id] = {
            _id: a._id,
            name,
            commandUses: 0,
            listenerUses: a.count,
          };
        }
      });

      await this.send({
        embed: {
          title: `Most active ${type}s ${
            ctx.args.timeRange === 'day'
              ? 'today'
              : 'this ' + ctx.args.timeRange
          }.`,
          fields: Object.values(info).map((stats) => ({
            name: stats.name,
            value: bot.lines(
              `Interacted with Hanabi ${stats.commandUses} times.`,
              `Talked to Hanabi ${stats.listenerUses} times.`,
            ),
          })),
          color: bot.colorInt('#f0b7d3'),
          thumbnail: {
            url: 'https://i.imgur.com/3y7lKq8.png',
          },
        },
      });
    } catch (err) {
      bot.logger.error(
        'Something shady happened when someone used the active command.',
      );
      bot.logger.error(err);
      this.send(
        "OMG I'm so sorry. I tripped while carrying all that data and it slipped... :(",
      );
    }
  },
});
