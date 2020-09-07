const { Schema, model } = require('mongoose');

const settingsSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    prefix: {
      type: String,
      minlength: 1,
      required: false,
    },
    listenerSettings: {
      allow: {
        type: Boolean,
        default: true,
      },
      ignored: { type: [String], default: [] },
    },
  },
  { timestamps: true },
);

settingsSchema.statics.getOrCreate = async function getOrCreate(guildId) {
  let settings;
  try {
    settings = await this.findById(guildId);
    if (settings) {
      return settings;
    }

    settings = new model('settings', settingsSchema)({ _id: guildId });
    await settings.save();
    return settings;
  } catch (err) {
    err.stack =
      `[Settings/getSettings] Could not get settings for id: ${guildId}\n` +
      err.stack;
    throw err;
  }
};

module.exports = model('settings', settingsSchema);
