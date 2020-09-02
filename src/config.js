const path = require('path');
require('tiny-env')();

const isProduction = process.env.NODE_ENV === 'production';

const config = {
  name: 'Hanabi',
  owners: ['517599684961894400', '554152090411466754'],
  admins: [],
  support: [],
  token: process.env.TOKEN,
  dbltoken: false,
  dblcomtoken: false,
  bodtoken: false,
  dbggtoken: false,
  saucetoken: false,
  apiport: process.env.PORT,
  debug: isProduction,
  root: path.resolve(__dirname),
  // Default per-server settings. New guilds have these settings.

  // DO NOT LEAVE ANY OF THESE BLANK, AS YOU WILL NOT BE ABLE TO UPDATE THEM
  // VIA COMMANDS IN THE GUILD.
  defaultSettings: {
    prefix: isProduction ? '~' : '!',
    modRole: 'Moderator',
    adminRole: 'Administrator',
  },
  defaultProfile: {
    preferDM: false,
  },

  // System messages
  messages: {
    COOLDOWN: 'Please wait **{0}** before using the {1} command again.',
    USAGE: "You're missing the **{0}** argument! \nUsage: {1}",
  },

  // PERMISSION LEVEL DEFINITIONS.

  permLevels: [
    // This is the lowest permission level, this is for users with no assigned role / lowest assigned role.
    {
      level: 0,
      name: 'User',
      // Don't bother checking, just return true which allows them to execute any command their
      // level allows them to.
      check: () => true,
    },

    {
      level: 2,
      name: 'Manage Messages',
      check: (message) => {
        try {
          return message.guild?.member(message.author)?.hasPermission('MANAGE_MESSAGES');
        } catch (ex) {
          return false;
        }
      },
    },

    {
      level: 3,
      name: 'Manage Roles',
      check: (message) => {
        try {
          return message.guild?.member(message.author)?.hasPermission('MANAGE_ROLES');
        } catch (ex) {
          return false;
        }
      },
    },

    {
      level: 4,
      name: 'Manage Guild',
      check: (message) => {
        try {
          return message.guild?.member(message.author)?.hasPermission('MANAGE_GUILD');
        } catch (ex) {
          return false;
        }
      },
    },

    // This is the server owner.
    {
      level: 5,
      name: 'Server Owner',
      // Simple check, if the guild owner id matches the message author's ID, then it will return true.
      // Otherwise it will return false.
      check: (message) =>
        message.channel.type === 'text'
          ? message.guild?.ownerID === message.author.id
            ? true
            : false
          : false,
    },

    // Bot Support is a special inbetween level that has the equivalent of server owner access
    // to any server they joins, in order to help troubleshoot the bot on behalf of owners.
    {
      level: 8,
      name: 'Bot Support',
      // The check is by reading if an ID is part of this array. Yes, this means you need to
      // change this and reboot the bot to add a support user. Make it better yourself!
      check: (message) =>
        config.owners.includes(message.author.id) ||
        config.admins.includes(message.author.id) ||
        config.support.includes(message.author.id),
    },

    // Bot Admin has some limited access like rebooting the bot or reloading commands.
    {
      level: 9,
      name: 'Bot Admin',
      check: (message) =>
        config.owners.includes(message.author.id) || config.admins.includes(message.author.id),
    },

    // This is the bot owner, this should be the highest permission level available.
    // The reason this should be the highest level is because of dangerous commands such as eval
    // or exec (if the owner has that).
    {
      level: 10,
      name: 'Bot Owner',
      // Another simple check, compares the message author id to the one stored in the config file.
      check: (message) => config.owners.includes(message.author.id),
    },
  ],
};

module.exports = config;
