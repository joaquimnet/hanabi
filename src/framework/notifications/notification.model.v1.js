const { model, Schema } = require('mongoose');

const schema = new Schema(
  {
    schemaVersion: { type: Number, default: 1 },
    userId: { type: String, ref: 'profile', required: true, index: true },
    image: {
      type: String,
    },
    readBy: [{ type: String, ref: 'profile', required: true, index: true }],
    expireAt: { type: Date },
    sendAt: { type: Date, default: () => new Date() },
  },
  { timestamps: true },
);

module.exports = model('notification', schema);
