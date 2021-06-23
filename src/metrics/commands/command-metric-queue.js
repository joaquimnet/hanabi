const CommandUsageMetric = require('./command-usage-metric.model');
const QueueProcessor = require('../QueueProcessor');

class CommandUsageMetricQueue extends QueueProcessor {
  constructor() {
    super(CommandUsageMetricQueue._process);
  }

  async enqueue({ userId, channelId, guildId, command, args, time }) {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const payload = {
      year,
      month,
      day,
      userId,
      channelId,
      guildId,
      command,
      args,
      time,
    };

    super.enqueue(payload);
  }

  static async _process(payload) {
    await CommandUsageMetric.updateOne(
      {
        'dating.year': payload.year,
        'dating.month': payload.month,
        'dating.day': payload.day,
        eventCount: { $lt: 1000 },
      },
      {
        $push: {
          events: {
            userId: payload.userId,
            guildId: payload.guildId,
            channelId: payload.channelId,
            command: payload.command,
            args: payload.args,
            time: payload.time,
          },
        },
        $inc: {
          eventCount: 1,
        },
      },
      { upsert: true },
    );
  }
}

const queue = new CommandUsageMetricQueue();

module.exports = queue;
