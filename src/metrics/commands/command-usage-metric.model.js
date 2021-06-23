const { model, Schema } = require('mongoose');

const schema = new Schema(
  {
    schema: { type: Number, default: 1 },
    dating: {
      year: { type: Number, default: () => new Date().getFullYear() },
      month: { type: Number, default: () => new Date().getMonth() + 1 },
      day: { type: Number, default: () => new Date().getDate() },
    },
    eventCount: { type: Number, default: 0 },
    events: [
      {
        userId: {
          type: String,
          reference: 'profile',
          required: true,
        },
        guildId: {
          type: String,
          reference: 'settings',
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
