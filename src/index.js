const { BotClient, defaultCommands } = require('@ponatech/bot');

const config = require('./config');
const { logger, terminate, connect, Schedule } = require('./modules');
const { Settings } = require('./models');
const web = require('./web');
const extensions = require('./client-extensions');

logger.info(`${config.name} v${require('../package.json').version}`);
logger.info(`Running on Node ${process.version}`);

const bot = new BotClient(config);
extensions.extendClient(bot);

// Load default commands
defaultCommands.forEach((cmd) => bot.loadCommand(cmd));

const init = async () => {
  await connect();
  web.listen(bot.config.apiport, () => {
    logger.info(`Web server listening on PORT ${bot.config.apiport}`);
  });
  logger.info('Database connected');

  // Extend the bot-core command parser
  bot.extend.metaParsing(extensions.attachProfileToMeta);
  bot.extend.metaParsing(extensions.attachSettingsToMeta);
  bot.extend.metaParsing(extensions.attachUtilityToMeta);

  // Prefix validation
  bot.extend.prefixChecking(extensions.prefixChecker);

  // TASK STUFF
  // TODO: load these automatically from the tasks directory
  const tasks = [require('./tasks/changeActivity')];
  bot.schedule = new Schedule(bot, tasks);

  bot.login(config.token).then(() => {
    logger.info('Logged into discord as', bot.user.tag);
    logger.info(`Loaded ${bot.commands.size} commands.`);
    logger.info(`Loaded ${bot.botListeners.size} listeners.`);

    // add ignored channels saved in db to the ignore list
    Settings.loadIgnoreList(bot).then(([cCount, gCount]) => {
      logger.info(
        `Listeners are ignoring ${cCount} channels and ${gCount} guilds.`,
      );
    });
  });
};

process.on('SIGINT', terminate());
process.on('SIGTERM', terminate());
process.on('uncaughtException', terminate('exception', bot));
process.on('unhandledRejection', terminate('rejection', bot));

init();

module.exports = bot;
