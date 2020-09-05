const { Listener } = require('@ponatech/bot');

const sentiment = require('../../services/language/sentiment');

module.exports = new Listener({
  words: ['{me}', 'kill(ing)*', 'you'],
  category: 'misc',
  cooldown: 10,
  priority: 0,
  run(bot, message, meta) {
    // If the message is kinda happy ignore it.
    if (sentiment(message.content).score >= 2) return false;

    meta.respond(
      "Yeaaaaaaaaaaahhhh..... I don't think that is a good idea. Let's all take a breather now.",
      'I shall bring good food and we can all sit down and talk this out! o3o',
    );
    return true;
  },
});
