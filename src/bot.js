const { BotClient, defaultCommands, FileLoader } = require('sensum');
const initButtons = require('discord-buttons');
const { Collection } = require('discord.js');
// const { AutoPoster } = require('topgg-autoposter')
const path = require('path');
const fs = require('fs');

const config = require('./config');
const extensions = require('./client-extensions');
const Alert = require('./framework/alerts/alert.service');
const AchievementManager = require('./framework/achievements/achievement-manager');
const NotificationManager = require('./framework/notifications/notification-manager');
const Brain = require('./framework/grammar/grammar.service');

const bot = new BotClient(config);
extensions.extendClient(bot);
initButtons(bot);
bot.buttons = new Collection();
bot.alerts = new Alert(bot);
bot.achievements = new AchievementManager(bot);
bot.notifications = new NotificationManager(bot);
FileLoader.readAllFiles({ root: __dirname }).then((files) => {
  const grammars = files.map((file) => {
    if (file.endsWith('.grammar')) {
      return fs.readFileSync(path.resolve(__dirname, file), 'utf-8');
    }
  });
  bot.brain = new Brain(bot, grammars.filter(Boolean));
});

// Load default commands
defaultCommands.forEach((cmd) => bot.loadCommand(cmd));

// Extend the bot-core command parser
bot.extend.metaParsing(extensions.attachProfileToMeta);
bot.extend.metaParsing(extensions.attachSettingsToMeta);
bot.extend.metaParsing(extensions.attachUtilityToMeta);
bot.extend.metaParsing(extensions.sendNotifications);

// Prefix validation
bot.extend.prefixChecking(extensions.prefixChecker);

// const poster = AutoPoster('awaiting approval', bot);

module.exports = bot;
