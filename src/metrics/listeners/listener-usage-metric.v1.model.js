const { model, Schema } = require('mongoose');

const schema = new Schema(
  {
    schema: { type: Number, default: 1 },
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
    userId: {
      type: String,
      reference: 'profile',
      required: true,
      index: true,
    },
    eventCount: { type: Number, default: 0 },
    events: [
      {
        guildId: {
          type: String,
          reference: 'settings',
        },
        channelId: {
          type: String,
          required: true,
        },
        listener: { type: String, required: true },
        category: { type: String, required: true },
        message: { type: String, required: true },
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

module.exports = model('listener-usage-metric', schema);
