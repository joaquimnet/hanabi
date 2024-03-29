const { model, Schema } = require('mongoose');

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
        userId: {
          type: String,
          reference: 'profile',
          required: true,
        },
        channelId: {
          type: String,
          required: true,
        },
        command: { type: String, required: true },
        args: [String],
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

module.exports = model('command-usage-metric', schema);
