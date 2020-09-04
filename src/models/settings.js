const { Schema, model } = require('mongoose');

const settingsSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    guildId: {
      type: String,
      minlength: 3,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = model('settings', settingsSchema);
