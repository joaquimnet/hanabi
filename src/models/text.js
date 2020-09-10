const { model, Schema } = require('mongoose');

const textSchema = new Schema(
  {
    identifier: {
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
      en: {
        type: String,
        required: true,
        minLength: 1,
      },
    },
  },
  { timestamps: true },
);

module.exports = model('text', textSchema);
