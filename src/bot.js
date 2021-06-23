const { BotClient, defaultCommands } = require('sensum');
const initButtons = require('discord-buttons');
const { Collection } = require('discord.js');

const config = require('./config');
const extensions = require('./client-extensions');

const bot = new BotClient(config);
extensions.extendClient(bot);
initButtons(bot);
bot.buttons = new Collection();

// Load default commands
defaultCommands.forEach((cmd) => bot.loadCommand(cmd));

// Extend the bot-core command parser
bot.extend.metaParsing(extensions.attachProfileToMeta);
bot.extend.metaParsing(extensions.attachSettingsToMeta);
bot.extend.metaParsing(extensions.attachUtilityToMeta);

// Prefix validation
bot.extend.prefixChecking(extensions.prefixChecker);

module.exports = bot;
