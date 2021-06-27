const { model, Schema } = require('mongoose');

const alertSchema = new Schema(
  {
    schemaVersion: { type: Number, default: 1 },
    title: {
      type: String,
      required: true,
      minLength: 1,
    },
    message: {
      type: String,
      required: true,
      minLength: 1,
    },
    thumbnail: {
      type: String,
      minLength: 1,
    },
    level: {
      type: String,
      enum: ['debug', 'info', 'success', 'warn', 'danger'],
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = model('alert', alertSchema);
