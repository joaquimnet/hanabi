const { model, Schema } = require('mongoose');

const schema = new Schema(
  {
    schemaVersion: { type: Number, default: 1 },
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
    readBy: [{ type: String, ref: 'profile' }],
    deleteAt: { type: Date },
  },
  { timestamps: true },
);

module.exports = model('notification-global', schema);
