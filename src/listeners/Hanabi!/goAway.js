const { Listener } = require('@ponatech/bot');

const { Settings } = require('../../models');

// the message.... if anyone literally says this imma smack them.
module.exports = new Listener({
  words: ['go', 'away', 'hanabi'],
  category: 'hanabi',
  cooldown: 1,
  priority: 0,
  async run(bot, message, meta) {
    let settings = await Settings.findOne({ _id: message.guild.id }).exec();

    if (!settings) {
      settings = new Settings({ _id: message.guild.id });
    }

    if (settings.listenerSettings.ignored.indexOf(message.channel.id) === -1) {
      settings.listenerSettings.ignored.push(message.channel.id);
    }

    await settings.save();

    bot.listeners.ignored.ignoreChannel(message.channel.id, 0);
    meta.respond(`:c I'm sorry.... I wont look here anymore... :pensive:`);
    return true;
  },
});
