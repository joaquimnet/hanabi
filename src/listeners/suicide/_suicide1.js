const { Listener } = require('chop-tools');

const sentiment = require('../../services/language/sentiment');
//const send = require('../../services/safeSend');

const MSG =
  'If you are feeling suicidal, please call the number in your area listed below. \nIf you are uncomfortable calling, please reach out to someone you trust and/or find a safe place. \nYou are worth *more*, __**you matter**__. Now matter how you are feeling, you are **valid and strong**. \n1-800-273-8255 **United States**\n0845 790 9090 **United Kingdom**\n1833 456 4566 **Canada**\n0145 394 000 **France**\n0800 181 0771 **Germany**\n13 11 14 **Australia**\n888 8817 666 **India**\n525 510 2550 **Mexico**\n+810 352 869 090 **Japan**\n914 590 050 **Spain**\n051 444 5691 **South Africa**\n0800 543 354 **New Zealand**';

module.exports = new Listener({
  words: ['{me}', '(suicide|suicidal)'],
  category: 'suicide',
  cooldown: 10,
  priority: 0,
  run(bot, message, meta) {
    const analysis = sentiment(message.content);
    // if "suicide" is negated. ex: "I'm not suicidal."
    if (analysis.positive.includes('suicide') || analysis.positive.includes('suicidal')) {
      return false;
    }
    this.send(message)(MSG);
    return true;
  },
});

// People's lives is all that matters to us. Which is why we made Bloo. 🔹💙