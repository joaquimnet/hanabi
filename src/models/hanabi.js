const mongoose = require('mongoose');

const { Schema } = mongoose;

const hanabiSchema = new Schema(
  {
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
    stats: {
      currentIdeaId: {
        type: Number,
        required: true,
        default: 0,
      },
    },
    loglevel: {
      type: String,
      required: true,
      default: 'info',
    },
  },
  { timestamps: true, optimisticConcurrency: true },
);

module.exports = mongoose.model('Hanabi', hanabiSchema);
