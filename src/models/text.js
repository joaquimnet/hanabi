const { model, Schema } = require('mongoose');

const textSchema = new Schema(
  {
    schemaVersion: { type: Number, default: 1 },
    label: {
      type: String,
      required: true,
      minLength: 1,
    },
    category: {
      type: String,
      required: true,
      minLength: 1,
    },
    content: {
      type: String,
      required: true,
      minLength: 1,
    },
  },
  { timestamps: true, optimisticConcurrency: true },
);

module.exports = model('text', textSchema);
