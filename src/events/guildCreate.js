const { logger } = require('../modules');
const { Alert } = require('../services');

module.exports = async (bot, guild) => {
  const prefix = bot.config.defaultSettings.prefix;
  const message = [
    "Hi! I'm Hanabi-sama!",
    'I am currently a work in progress :orange_heart:',
    `My prefix automatically is "${prefix}", but you can change my prefix for this server using the "${prefix}prefix" command!`,
    'Thank you for choosing to support me running :orange_heart:',
    'I hope I can help aide in this server to the best of my capability.',
  ];
  // '' feel free to join my support server where you can interact with
  // others & get real life updates in the server on Hana <33 @link goes here. TBD //
  Alert.send({
    type: Alert.types.invited,
    bot,
    message: `Hanabi joined a new server!\n**${guild.name}** (${guild.id})`,
    thumbnail: guild.iconURL(),
  });

  try {
    const channel = guild.systemChannel;
    await channel.send(message);
  } catch (err) {
    // Couldn't message guild.
    logger.error(err);
  }
};
// testing time!
