const { BotClient, defaultCommands } = require('@ponatech/bot');

const config = require('./config');
const { logger, terminate, connect, Schedule } = require('./modules');
const { Profile, Settings } = require('./models');
const web = require('./web');

logger.info(`${config.name} v${require('../package.json').version}`);
logger.info(`Running on Node ${process.version}`);

const bot = new BotClient(config);

bot.logger = logger;

/*
███████╗ ██╗░░░██╗ ░█████╗░ ██╗░░██╗
██╔════╝ ██║░░░██║ ██╔══██╗ ██║░██╔╝
█████╗░░ ██║░░░██║ ██║░░╚═╝ █████═╝░
██╔══╝░░ ██║░░░██║ ██║░░██╗ ██╔═██╗░
██║░░░░░ ╚██████╔╝ ╚█████╔╝ ██║░╚██╗
╚═╝░░░░░ ░╚═════╝░ ░╚════╝░ ╚═╝░░╚═╝
*/
// process.exit(0);

/*
  Profile function
  This function merges the default settings (from config.defaultProfile) with any
  user override you might have for particular user. If no overrides are present,
  the default settings are used.
  */
bot.getProfile = async (userId) => {
  // const profile = await bot.profiles.ensured(userId, {
  //   userId,
  //   ...bot.config.defaultProfile,
  // });
  // return merge({}, bot.config.defaultProfile, profile);
  const profile = await Profile.getOrCreate(userId);
  return profile;
};

/*
  GUILD SETTINGS FUNCTION
  This function merges the default settings (from config.defaultSettings) with any
  guild override you might have for particular guild. If no overrides are present,
  the default settings are used.
  */
bot.getSettings = async (guildId) => {
  // const guildConf = await bot.settings.ensured(guildId, {
  //   guildId,
  //   ...bot.config.defaultSettings,
  // });
  // return merge({}, bot.config.defaultSettings, guildConf);
  const settings = await Settings.getOrCreate(guildId);
  return settings;
};

bot.on('error', logger.error);
bot.on('warn', logger.warn);

const init = async () => {
  await connect();
  web.listen(bot.config.apiport, () => {
    logger.info(`Web server listening on apiport ${bot.config.apiport}`);
  });
  logger.info('Database connected');

  // Extend the bot-core command parser
  bot.extend.metaParsing(async (meta) => {
    Object.defineProperty(meta, 'respond', {
      value: (...args) => meta.message.channel.send(bot.lines(...args)),
    });

    const profile = await bot.getProfile(meta.userId);
    // Define meta.profile as a getter to always try to get an updated version of the profile
    Object.defineProperty(meta, 'profile', {
      get: function () {
        return profile;
      },
    });

    if (meta.isDM) {
      return;
    }
    const settings = await bot.getSettings(meta.guild.id);
    // Define meta.settings as a getter to always try to get an updated version of the settings
    Object.defineProperty(meta, 'settings', {
      value: settings,
    });

    Object.defineProperty(meta, 'getPrefix', {
      value: function () {
        const customPrefix = meta.settings.prefix;
        const defaultPrefix = bot.config.defaultSettings.prefix;
        return customPrefix ?? defaultPrefix;
      },
    });
  });

  // Prefix validation
  bot.extend.prefixChecking(async (_, message) => {
    const guildId = message.guild?.id;
    const settings = await bot.getSettings(guildId);
    const prefixInDb = settings.prefix;
    const defaultPrefix = bot.config.defaultSettings.prefix;

    // Checks if the bot was mentioned, with no message after it, reply with prefix.
    const prefixMention = new RegExp(`^<@!?${bot.user?.id}>( |)$`);
    if (message.content.match(prefixMention)) {
      message
        .reply(`My prefix in here is \`${settings?.prefix || bot.config.defaultSettings.prefix}\``)
        .catch(() => {});
      return false;
    }

    const content = message.content.trim().toLowerCase().replace(/\s\s+/g, ' ').trim();

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
  });

  // TASK STUFF
  // TODO: load these automatically from the tasks directory
  const tasks = [require('./tasks/changeActivity')];
  bot.schedule = new Schedule(bot, tasks);

  bot.login(config.token).then(() => {
    logger.info('Logged into discord as', bot.user.tag);
    // Load default commands
    defaultCommands.forEach((cmd) => bot.loadCommand(cmd));
    logger.info(`Loaded ${bot.commands.size} commands.`);
    logger.info(`Loaded ${bot.botListeners.size} listeners.`);

    // add ignored channels saved in db to the ignore list
    Settings.find({})
      .exec()
      .then(documents => {
        let channelCount = 0;
        let guildCount = 0;
        documents.forEach(document => {
          document.listenerSettings.ignored.forEach(c => {
            channelCount += 1;
            bot.botListeners.ignored.ignoreChannel(c, 0);
          });
          if (!document.listenerSettings.allow) {
            guildCount += 1;
            bot.botListeners.ignored.ignoreGuild(document._id);
          }
        });
        // ignored guilds
        bot.botListeners.ignored.ignoreGuild('264445053596991498', 0);
        bot.logger.info(
          `Adding ${channelCount} channels and ${guildCount + 1} guilds to the listener ignore list from the database.`,
        );
      })
      .catch(bot.logger.error);
  });
};

init();

process.on('SIGINT', terminate());
process.on('SIGTERM', terminate());
process.on('uncaughtException', terminate('exception', bot));
process.on('unhandledRejection', terminate('rejection', bot));

module.exports = bot;
