const { Command, Permission } = require('sensum');

const CommandUsageMetrics = require('../../metrics/commands/command-usage-metric.v1.model');
const ListenerUsageMetrics = require('../../metrics/listeners/listener-usage-metric.v1.model');
const Time = require('../../services/time.service');

module.exports = new Command({
  name: 'active',
  description: 'Most active guilds.',
  category: 'info',
  args: {
    timeRange: { type: 'enum', values: ['day', 'week', 'month', 'year'] },
  },
  delete: false,
  hidden: true,
  permission: Permission.BOT_SUPPORT,
  async run(bot, message, ctx) {
    const timeRange = Time.moment()
      .startOf(ctx.args.timeRange)
      .startOf('day')
      .toDate();

    const [commandAggregation, listenerAggregation] = await Promise.all([
      CommandUsageMetrics.aggregate([
        // Spread the individual events in the events array.
        { $unwind: '$events' },
        // Filter out events older than the specified time range.
        { $match: { 'events.time': { $gte: timeRange } } },
        // Group events by guild id and count them.
        { $group: { _id: '$events.guildId', count: { $sum: 1 } } },
        // Sort by most counts in descending order.
        { $sort: { count: -1 } },
      ]).exec(),
      ListenerUsageMetrics.aggregate([
        // Spread the individual events in the events array.
        { $unwind: '$events' },
        // Filter out events older than the specified time range.
        { $match: { 'events.time': { $gte: timeRange } } },
        // Group events by guild id and count them.
        { $group: { _id: '$events.guildId', count: { $sum: 1 } } },
        // Sort by most counts in descending order.
        { $sort: { count: -1 } },
      ]).exec(),
    ]);

    const info = {};

    commandAggregation.forEach((a) => {
      info[a._id] = {
        _id: a._id,
        name: bot.guilds.cache.get(a._id)?.name ?? '[not cached]',
        commandUses: a.count,
        listenerUses: 0,
      };
    });
    listenerAggregation.forEach((a) => {
      info[a._id].listenerUses = a.count;
    });

    this.send(
      bot.lines(
        'Done!',
        '```json',
        JSON.stringify(Object.values(info), null, 2),
        '```',
      ),
    );
  },
});
