const { logger } = require('./modules');
const { Profile, Settings } = require('./models');

const genericMetricQueue = require('./metrics/general/generic-metric-queue');

function isObject(value) {
  return value && typeof value === 'object' && value.constructor === Object;
}

function extendClient(bot) {
  // attaches the logger to the bot
  bot.logger = logger;

  // Hanabi version
  bot.version = require('../package.json').version;

  /*
  Profile function
  This functions return a profile for the id provided or
  creates one if it doesn't already exist.
  */
  bot.getProfile = async (userId) => {
    const profile = await Profile.getOrCreate(userId);
    return profile;
  };

  /*
  GUILD SETTINGS FUNCTION
  This functions return a Settings for the id provided or
  creates one if it doesn't already exist.
  */
  bot.getSettings = async (guildId) => {
    const settings = await Settings.getOrCreate(guildId);
    return settings;
  };

  /*
  Utility to save generic metrics to the database.
  */
  bot.saveMetric = (subject, payload) =>
    genericMetricQueue.enqueue({ subject, value: payload });
}

async function attachProfileToMeta(meta) {
  const bot = meta.message.client;

  const profile = await bot.getProfile(meta.userId);
  // Define meta.profile as a getter to always try to get an updated version of the profile
  Object.defineProperty(meta, 'profile', {
    get: function () {
      return profile;
    },
  });
}

async function attachSettingsToMeta(meta) {
  const bot = meta.message.client;

  if (meta.isDM) {
    return;
  }

  const settings = await bot.getSettings(meta.guild.id);
  // Define meta.profile as a getter to always try to get an updated version of the settings
  Object.defineProperty(meta, 'settings', {
    get: function () {
      return settings;
    },
  });
}

function attachUtilityToMeta(meta) {
  const bot = meta.message.client;

  // Adds meta.getPrefix()
  // It retrieves the prefix for the current guild or the default
  // one if no custom prefix is set.
  Object.defineProperty(meta, 'getPrefix', {
    value: function () {
      const customPrefix = meta.settings?.prefix;
      const defaultPrefix = bot.config.defaultSettings.prefix;
      return customPrefix ?? defaultPrefix;
    },
  });

  // Adds meta.respond()
  // It's better than channel.send()
  // It automatically breaks lines and catches errors.
  Object.defineProperty(meta, 'respond', {
    value: safeSend,
  });

  function safeSend(...args) {
    const lines = [...args];
    const lastArg = lines.pop();
    const msg = bot.helpers.lines(
      ...lines,
      typeof lastArg === 'string' ? lastArg : '',
    );

    return meta.message.channel
      .send(msg, isObject(lastArg) ? lastArg : undefined)
      .catch((err) => {
        const channelName = meta.message.channel?.name;
        const channelId = meta.message.channel.id;
        const guildName = meta.guild?.name;
        const guildId = meta.guild?.id;
        bot.emit(
          'warn',
          bot.helpers.lines(
            `Could not send message.`,
            `Channel: ${channelName} (${channelId})`,
            `Guild: ${guildName} (${guildId})`,
            `DM: ${meta.isDM}`,
            `Error: ${err.message}`,
          ),
        );
      });
  }
}

function sendNotifications(meta) {
  const channel = meta.message.channel;
  if (!channel) return;
  if (!meta.commandName) return;
  channel.client.notifications
    .send(channel, meta.userId)
    .catch((err) => channel.client.emit('error', err));
}

async function prefixChecker(bot, message) {
  const guildId = message.guild?.id;
  const settings = guildId ? await bot.getSettings(guildId) : undefined;
  const prefixInDb = settings?.prefixvin;
  const defaultPrefix = bot.config.defaultSettings.prefix;

  // Checks if the bot was mentioned, with no message after it, reply with prefix.
  const prefixMention = new RegExp(`^<@!?${bot.user?.id}>( |)$`);
  if (message.content.match(prefixMention)) {
    message
      .reply(
        `My prefix in here is \`${
          settings?.prefix || bot.config.defaultSettings.prefix
        }\``,
      )
      .catch(() => {});
    return false;
  }

  const content = message.content
    .trim()
    .toLowerCase()
    .replace(/\s\s+/g, ' ')
    .trim();

  // return truthy with default prefix if in DMs
  if (!guildId) {
    return content.startsWith(defaultPrefix) ? defaultPrefix : false;
  }

  // If guild prefix equals default prefix that should not be treated as a custom prefix.
  const customPrefix = prefixInDb === defaultPrefix ? false : prefixInDb;

  // do not run command with normal prefix if a custom prefix is set
  if (customPrefix && content.startsWith(defaultPrefix)) {
    return false;
  }

  // has custom prefix and command starts with it
  if (customPrefix && content.startsWith(customPrefix)) {
    return customPrefix;
  }

  // does not have custom prefix and command starts with default prefix
  if (!customPrefix && content.startsWith(defaultPrefix)) {
    return defaultPrefix;
  }

  return false;
}

module.exports = {
  extendClient,
  attachProfileToMeta,
  attachSettingsToMeta,
  attachUtilityToMeta,
  sendNotifications,
  prefixChecker,
};
