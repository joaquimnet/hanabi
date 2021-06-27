const { BotClient, defaultCommands } = require('sensum');
const initButtons = require('discord-buttons');
const { Collection } = require('discord.js');
// const { AutoPoster } = require('topgg-autoposter')

const config = require('./config');
const extensions = require('./client-extensions');
const Alert = require('./logging/alert.service');

const bot = new BotClient(config);
extensions.extendClient(bot);
initButtons(bot);
bot.buttons = new Collection();
bot.alerts = new Alert(bot);

// Load default commands
defaultCommands.forEach((cmd) => bot.loadCommand(cmd));

// Extend the bot-core command parser
bot.extend.metaParsing(extensions.attachProfileToMeta);
bot.extend.metaParsing(extensions.attachSettingsToMeta);
bot.extend.metaParsing(extensions.attachUtilityToMeta);

// Prefix validation
bot.extend.prefixChecking(extensions.prefixChecker);

// const poster = AutoPoster('awaiting approval', bot);

module.exports = bot;
