const { logger } = require('../modules');

module.exports = async (bot, guild) => {
  const message = [
    '###################################',
    'message',
    'goes',
    'here',
    '#################################',
  ];

  logger.info(`Hanabi-sama joined a new guild! >> ${guild.name} (${guild.id})`);

  try {
    const channel = guild.systemChannel;
    await channel.send(message);
  } catch (err) {
    logger.error(err);
  }
};
