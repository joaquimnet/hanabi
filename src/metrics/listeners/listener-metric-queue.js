const ListenerUsageMetric = require('./listener-usage-metric.v1.model');
const QueueProcessor = require('../QueueProcessor');

class ListenerUsageMetricQueue extends QueueProcessor {
  constructor() {
    super(ListenerUsageMetricQueue._process);
  }

  async enqueue({
    userId,
    channelId,
    guildId,
    listener,
    category,
    message,
    time,
  }) {
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
      listener,
      category,
      message,
      time,
    };

    super.enqueue(payload);
  }

  static async _process(payload) {
    await ListenerUsageMetric.updateOne(
      {
        'dating.year': payload.year,
        'dating.month': payload.month,
        'dating.day': payload.day,
        userId: payload.userId,
        eventCount: { $lt: 1000 },
      },
      {
        $push: {
          events: {
            guildId: payload.guildId,
            channelId: payload.channelId,
            listener: payload.listener,
            category: payload.category,
            message: payload.message,
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

const queue = new ListenerUsageMetricQueue();

module.exports = queue;
