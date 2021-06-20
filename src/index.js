const bot = require('./bot');
const config = require('./config');
const { logger, terminate, connect } = require('./modules');
const web = require('./web');

logger.info(`${config.name} v${require('../package.json').version}`);
logger.info(`Running on Node ${process.version}`);

async function init() {
  web.listen(config.apiport, () => {
    logger.info(`Web server listening on PORT ${bot.config.apiport}`);
  });

  bot.login(config.token);
}

process.on('SIGINT', terminate());
process.on('SIGTERM', terminate());
process.on('uncaughtException', terminate('exception', bot));
process.on('unhandledRejection', terminate('rejection', bot));

init();
