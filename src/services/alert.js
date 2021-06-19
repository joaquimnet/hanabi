const { MessageEmbed } = require('discord.js');

const { logger } = require('../modules');
const { Alert: AlertModel } = require('../models');

const { Hanabi } = require('../models');

const messages = {
  0: 'Possibly suicidal message detected.',
  1: '__***Catastrophic Error!!!***__ Please take action immediately! ⚠ ⚠ ⚠ ',
  2: "We've received a new piece of feedback! :D",
  3: 'Hanabi got invited into a new server! 🎉',
  4: '⚠️ An error occurred! ⚠️',
  5: '📥 Hanabi got a new vote!',
};

class Alert {
  static async send({ type, bot, message, thumbnail }) {
    logger.log(`${messages[type]} -- ${message}`);
    const hanabiConfig = await Hanabi.findOne({}).exec();
    if (!hanabiConfig) {
      bot.emit('error', new Error('Hanabi config is missing!'));
      return;
    }

    const guild = bot.guilds.cache.get(hanabiConfig.logs.guild);

    if (!guild) {
      bot.emit('error', new Error('Logs guild is missing in Hanabi Config!'));
      return;
    }

    const channel = guild.channels.cache.get(hanabiConfig.logs.channel);

    if (!channel) {
      bot.emit('error', new Error('Logs channel is missing in Hanabi Config!'));
      return;
    }

    if (channel.type !== 'text') {
      bot.emit(
        'error',
        new Error('Logs channel in Hanabi Config is not a text channel!'),
      );
      return;
    }

    const embed = new MessageEmbed({
      title: messages[Number(type)],
      description: message,
      thumbnail: thumbnail && {
        url: thumbnail,
      },
    });
    channel
      .send({
        embed,
      })
      .catch((err) => {
        logger.error('Failed to send alert to development server.', err);
      });

    this.logToDb(
      Alert.typesNames[Number(type)],
      messages[Number(type)],
      message,
      thumbnail,
    );
  }

  static logToDb(type, title, message, thumbnail) {
    const alert = new AlertModel({ type, title, message: message || '[empty]', thumbnail });
    alert.save().catch((err) => {
      logger.error('Failed to log alert to database.', err);
    });
  }
}

Alert.types = {
  suicide: 0,
  catastrophic_error: 1,
  feedback: 2,
  invited: 3,
  error: 4,
  vote: 5,
};

Alert.typesNames = {
  0: 'suicide',
  1: 'catastrophic_error',
  2: 'feedback',
  3: 'invited',
  4: 'error',
  5: 'vote',
};

module.exports = Alert;
