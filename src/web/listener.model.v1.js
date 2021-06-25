const { model, Schema } = require('mongoose');

const schema = new Schema(
  {
    schemaVersion: { type: Number, default: 1 },
    _id: { type: String, required: true },
    name: { type: String, required: true },
    words: { type: [String], required: true },
    category: { type: String, required: true },
    slug: { type: String, required: true, index: true },
    permission: { type: Number, required: true },
    cooldown: { type: Number, required: true },
    globalCooldown: { type: Number, required: true },
    priority: { type: Number, required: true },
    maxMessageLength: { type: Number, required: true },
  },
  { timestamps: true, optimisticConcurrency: true },
);

module.exports = model('listener', schema);
