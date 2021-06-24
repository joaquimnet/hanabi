const mongoose = require('mongoose');

const { Schema } = mongoose;

const hanabiSchema = new Schema(
  {
    schemaVersion: { type: Number, default: 1 },
    logs: {
      channel: {
        type: String,
      },
      guild: {
        type: String,
      },
    },
    alerts: {
      channel: {
        type: String,
      },
      guild: {
        type: String,
      },
    },
  },
  { timestamps: true, optimisticConcurrency: true },
);

module.exports = mongoose.model('Hanabi', hanabiSchema);
