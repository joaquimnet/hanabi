const { BotClient, defaultCommands } = require('@ponatech/bot');

const config = require('./config');
const { Schedule } = require('./modules');
const extensions = require('./client-extensions');

const bot = new BotClient(config);
extensions.extendClient(bot);

// Load default commands
defaultCommands.forEach((cmd) => bot.loadCommand(cmd));

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

module.exports = bot;
