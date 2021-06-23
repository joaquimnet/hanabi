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
  { timestamps: true, optimisticConcurrency: true },
);

settingsSchema.statics.getOrCreate = async function getOrCreate(guildId) {
  let settings;
  try {
    settings = await model('settings', settingsSchema).findById(guildId);
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

settingsSchema.statics.loadIgnoreList = async function loadIgnoreList(bot) {
  const documents = await model('settings', settingsSchema).find({}).exec();

  let channelCount = 0;
  let guildCount = 0;
  documents.forEach((document) => {
    document.listenerSettings.ignored.forEach((c) => {
      channelCount += 1;
      bot.botListeners.ignored.ignoreChannel(c, 0);
    });
    if (!document.listenerSettings.allow) {
      guildCount += 1;
      bot.botListeners.ignored.ignoreGuild(document._id);
    }
  });

  // top.gg guild
  bot.botListeners.ignored.ignoreGuild('264445053596991498', 0);

  return [channelCount, guildCount + 1];
};

module.exports = model('settings', settingsSchema);
