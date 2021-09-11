const { model, Schema } = require('mongoose');

const schema = new Schema(
  {
    schemaVersion: { type: Number, default: 1 },
    _id: { type: String, required: true },
    flag: { type: String, required: true },
    displayName: { type: String, required: true },
    description: { type: String, required: true },
    group: {
      flag: { type: String, required: true },
      displayName: { type: String, required: true },
    },
  },
  { timestamps: true, optimisticConcurrency: true },
);

module.exports = model('achievement', schema);
