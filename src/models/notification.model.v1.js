const { model, Schema } = require('mongoose');

const schema = new Schema(
  {
    schemaVersion: { type: Number, default: 1 },
    userId: { type: String, ref: 'profile', required: true, index: true },
    title: {
      type: String,
      required: true,
      minLength: 1,
    },
    description: {
      type: String,
      required: true,
      minLength: 1,
    },
    thumbnail: {
      type: String,
    },
    image: {
      type: String,
    },
    color: {
      type: Number,
    },
    tags: { type: [String], default: [] },
    deleteAt: { type: Date },
    ttl: { type: Date },
  },
  { timestamps: true },
);

module.exports = model('notification', schema);
