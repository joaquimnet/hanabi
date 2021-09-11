const GenericMetricModelV1 = require('./generic-metric.model.v1');
const QueueProcessor = require('../QueueProcessor');

class GenericMetricQueue extends QueueProcessor {
  constructor() {
    super(GenericMetricQueue._process);
  }

  async enqueue({ subject, value, time }) {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const payload = {
      year,
      month,
      day,
      subject,
      value,
      time,
    };

    super.enqueue(payload);
  }

  static async _process(payload) {
    await GenericMetricModelV1.updateOne(
      {
        'dating.year': payload.year,
        'dating.month': payload.month,
        'dating.day': payload.day,
        subject: payload.subject,
        eventCount: { $lt: 1000 },
      },
      {
        $push: {
          events: {
            subject: payload.subject,
            value: payload.value,
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

const queue = new GenericMetricQueue();

module.exports = queue;
