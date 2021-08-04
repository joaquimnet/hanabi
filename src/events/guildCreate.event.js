const { EventHandler } = require('sensum');
const Long = require('long');

const { logger } = require('../modules');

module.exports = new EventHandler({
  name: 'guildCreate',
  async run(bot, guild) {
    const prefix = bot.config.defaultSettings.prefix;
    const message = [
      "Hi! I'm Hanabi!",
      'I am currently a work in progress :orange_heart:',
      `My prefix automatically is "${prefix}", but you can change my prefix for this server using the "${prefix}prefix" command!`,
      'Thank you for choosing to support me running :orange_heart:',
      'I hope I can help aide in this server to the best of my capability.',
    ];
    // TODO: '' feel free to join my support server where you can interact with TBD
    // TODO: others & get real life updates in the server on Hana <33 @link goes here. TBD twitter/support links (dono page etcetera)
    // TODO: @hanani @hanabibot @hanabot @habambi @hibana @hanabi
    bot.alerts.sendSuccess({
      type: 'Hanabi has been invited to a server!',
      message: `Hanabi joined a new server!\n**${guild.name}** (${guild.id})`,
      thumbnail: guild.iconURL(),
    });
    // nothing? 🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔
    try {
      const channel = getDefaultChannel(guild);
      if (channel) {
        await channel.send(bot.lines(message));
      }
    } catch (err) {
      // Couldn't message guild.
      logger.error(err);
    }
  },
});
// testing time!

function getDefaultChannel(guild) {
  // get "original" default channel
  if (guild.channels.cache.has(guild.id))
    return guild.channels.cache.get(guild.id);

  // Check for a "general" channel, which is often default chat
  const generalChannel = guild.channels.cache.find(
    (channel) => channel.name === 'general',
  );
  if (generalChannel) return generalChannel;
  // Now we get into the heavy stuff: first channel in order where the bot can speak
  // hold on to your hats!
  return guild.channels.cache
    .filter(
      (c) =>
        c.type === 'text' &&
        c.permissionsFor(guild.client.user).has('SEND_MESSAGES'),
    )
    .sort(
      (a, b) =>
        a.position - b.position ||
        Long.fromString(a.id).sub(Long.fromString(b.id)).toNumber(),
    )
    .first();
}
