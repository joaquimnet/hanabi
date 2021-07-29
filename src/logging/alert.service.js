const { MessageEmbed } = require('discord.js');

const Hanabi = require('../models/hanabi');
const AlertModelV1 = require('./alert.model.v1');

class Alert {
  constructor(bot) {
    this.bot = bot;
  }

  sendDebug({ title, message, thumbnail }) {
    return this._sendAlert(title, message, thumbnail, 'debug');
  }

  sendInfo({ title, message, thumbnail }) {
    return this._sendAlert(title, message, thumbnail, 'info');
  }

  sendSuccess({ title, message, thumbnail }) {
    return this._sendAlert(title, message, thumbnail, 'success');
  }

  sendWarn({ title, message, thumbnail }) {
    return this._sendAlert(title, message, thumbnail, 'warn');
  }

  sendDanger({ title, message, thumbnail }) {
    return this._sendAlert(title, message, thumbnail, 'danger');
  }

  sendError(...args) {
    return this.sendDanger(...args);
  }

  async _sendAlert(title, message, thumbnail, level) {
    const alert = new AlertModelV1({
      title,
      message,
      thumbnail,
      level,
    });

    try {
      await alert.save();
      // eslint-disable-next-line no-empty
    } catch {}

    try {
      const hanabiConfig = await Hanabi.findOne({}).exec();
      if (!hanabiConfig) {
        this.bot.emit('error', new Error('Hanabi config is missing!'));
        return;
      }

      const guild = this.bot.guilds.cache.get(hanabiConfig.logs.guild);

      if (!guild) {
        this.bot.emit(
          'error',
          new Error('Logs guild is missing in Hanabi Config!'),
        );
        return;
      }

      const channel = guild.channels.cache.get(hanabiConfig.logs.channel);

      if (!channel) {
        this.bot.emit(
          'error',
          new Error('Logs channel is missing in Hanabi Config!'),
        );
        return;
      }

      if (channel.type !== 'text') {
        this.bot.emit(
          'error',
          new Error('Logs channel in Hanabi Config is not a text channel!'),
        );
        return;
      }

      let color;

      switch (level) {
        case 'debug':
          color = this.bot.colorInt('#34ebe5');
          break;
        case 'info':
          color = this.bot.colorInt('#0367fc');
          break;
        case 'success':
          color = this.bot.colorInt('#0ecc00');
          break;
        case 'warn':
          color = this.bot.colorInt('#e3a710');
          break;
        case 'danger':
          color = this.bot.colorInt('#ff000d');
          break;
      }

      const embed = new MessageEmbed({
        title,
        description: message,
        thumbnail: thumbnail && {
          url: thumbnail,
        },
        color,
      });

      channel
        .send({
          embed,
        })
        .catch((err) => {
          this.bot.logger.error(
            'Failed to send alert to development server.',
            err,
          );
        });
      // eslint-disable-next-line no-empty
    } catch {}
  }
}

module.exports = Alert;
