const { BotClient, defaultCommands } = require('@ponatech/bot');
const merge = require('lodash.merge');
const config = require('./config');
const { logger, terminate, connect, MongooseCollectionSync } = require('./modules');
const { Profile } = require('./models');

logger.info(`${config.name} v${require('../package.json').version}`);
logger.info(`Running on Node ${process.version}`);

const bot = new BotClient(config);

bot.on('error', logger.error);

const init = async () => {
  await connect();
  logger.info('Database connected');

  bot.profiles = new MongooseCollectionSync(Profile, { fullLoad: true });

  /*
  Profile function
  This function merges the default settings (from config.defaultProfile) with any
  user override you might have for particular user. If no overrides are present,
  the default settings are used.
  */
  bot.getProfile = async (userId) => {
    const profile = await bot.profiles.ensured(userId, {
      userId,
      ...bot.config.defaultProfile,
    });
    return merge({}, bot.config.defaultProfile, profile);
  };

  // Extend the bot-core command parser
  bot.extend.metaParsing(async (meta) => {
    const profile = await bot.getProfile(meta.userId);
    // Define meta.profile as a getter to always try to get an updated version of the profile
    Object.defineProperty(meta, 'profile', {
      get: function () {
        return profile;
      },
    });
  });

  bot.login(config.token).then(() => {
    logger.info('Logged into discord as', bot.user.tag);
    defaultCommands.forEach((cmd) => bot.loadCommand(cmd));
    logger.info(`Loaded ${bot.commands.size} commands.`);
  });
};

init();

process.on('SIGINT', terminate());
process.on('SIGTERM', terminate());
process.on('uncaughtException', terminate('exception', bot));
process.on('unhandledRejection', terminate('rejection', bot));
