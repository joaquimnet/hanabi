const { model, Schema } = require('mongoose');

const genericMetricQueue = require('./generic-metric-queue');

const schema = new Schema(
  {
    schemaVersion: { type: Number, default: 1 },
    dating: {
      year: {
        type: Number,
        index: true,
        default: () => new Date().getFullYear(),
      },
      month: {
        type: Number,
        index: true,
        default: () => new Date().getMonth() + 1,
      },
      day: { type: Number, index: true, default: () => new Date().getDate() },
    },
    subject: {
      type: String,
      required: true,
      index: true,
    },
    eventCount: { type: Number, default: 0 },
    events: [
      {
        subject: {
          type: String,
          required: true,
        },
        value: Schema.Types.Mixed,
        environment: {
          type: String,
          default: process.env.NODE_ENV ?? 'development',
        },
        time: { type: Date, default: new Date() },
      },
    ],
  },
  { timestamp: true },
);

schema.statics.pushMetric = function pushMetric({ subject, value, time }) {
  genericMetricQueue.enqueue({ subject, value, time });
};

module.exports = model('generic-metric', schema);
