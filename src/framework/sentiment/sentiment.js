const multilangSentiment = require('multilang-sentiment');

const words = {
  '🍥': 0,
  '🍱': 0,
  '❤️': 2,
  '🙂': 1,
  hurt: -5,
  cut: -5,
  dead: -5,
  die: -10,
  pain: -8,
  hang: -5,
  depressed: -5,
  kms: -5, // for suicide_10.js
  fucc: -2,
};

// Sentiment IIFE to save a reference to the client and log sentiment usage.
const sentiment = (() => {
  let client;
  const S = (text) => {
    const result = multilangSentiment(text, 'en', { words });
    if (client) {
      client.metrics.insert('sentiment', {
        length: text.length,
        score: result.score,
        time: Date.now(),
      });
    }
    return result;
  };
  S.setClient = (clt) => {
    if (client) return;
    client = clt;
    client.metrics.register('sentiment', (data) => {
      return { ...data };
    });
  };
  return S;
})();

module.exports = sentiment;
