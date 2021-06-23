const { model, Schema } = require('mongoose');

const textSchema = new Schema(
  {
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
