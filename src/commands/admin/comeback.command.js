const { Command } = require('sensum');

const getChannelsInMessage = require('../../util/getChannelsInMessage');

module.exports = new Command({
  name: 'comeback',
  description: 'For when you want Hanabi to listen again after being muted',
  category: 'admin',
  usage: '[channel name]',
  examples: [' ', '#general'],
  aliases: ['listenhere'],
  async run(bot, message, meta) {
    let [channel] = getChannelsInMessage(message);
    if (!channel) channel = message.channel;

    const allowed = meta.settings.listenerSettings.allow;
    meta.settings.listenerSettings.ignored = meta.settings.listenerSettings.ignored.filter(
      (c) => c !== channel.id,
    );

    await meta.settings.save();

    // unmute said channel
    bot.botListeners.ignored.listenChannel(channel.id);
    meta.respond(
      `I will listen to ${channel} once more, thank you for allowing me to use my ears again.`,
      allowed
        ? ':blue_heart:'
        : `But listeners are disabled in this server. So... if you want to enable them use **${meta.getPrefix()}settings listeners** :blue_heart:`,
    );
  },
});
