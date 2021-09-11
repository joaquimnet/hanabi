const { Listener } = require('sensum');

const sentiment = require('../../framework/sentiment/sentiment');

const MSG = require('./suicide-message');

module.exports = new Listener({
  words: [
    '(suicide|kill myself|off myself|oof myself|my own life|end my life|ending my life)',
  ],
  category: 'suicide',
  cooldown: 10,
  priority: -1,
  async run(bot, message, meta) {
    const content = message.content;
    // (Anal)ysis
    const anal = sentiment(content);
    // If anal score is high then its a false positive
    if (anal.score > 4) {
      // return false here means it will just go to the next listener
      return false;
    }

    this.send(...MSG);

    bot.logger.info(`Suicide listener sentiment analysis:`, anal.score);
    bot.alerts.sendWarn({
      title: 'Suicide by sentiment listener triggered.',
      message: `${message.author.tag}: ${message.content}`,
      thumbnail: message.author.avatarURL(),
    });
    return true;
  },
});

// People's lives is all that matters to us. Which is why we made Hanabi-sama<3
