const { model, Schema } = require('mongoose');

const alertSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      minLength: 1,
    },
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
  },
  { timestamps: true },
);

module.exports = model('alert', alertSchema);
