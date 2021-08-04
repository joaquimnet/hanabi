const { Listener } = require('sensum');
//const sentiment = require('../../services/language/sentiment');
//const send = require('../../services/safeSend');

const MSG = require('./suicide-message');
//(['{me}', '(suicide|suicidal)'], ['{me}', '(suicide|suicidal)'], ['{me}', 'kms'], ['{me}', 'feel', 'dying'], ['{me}','commit', 'suicide'], ['(take|taking|end|ending)', '(own|my)', 'life'], ['{me}', '(think|thinking|thought)', '(about|of)', 'death'], ['{me}', '(want|wanna|gonna|going to)', '(off|kill)', 'myself'], ['{me}', '(off|offing|kill|killing)', 'myself'], ['jeg', 'vil', 'do'], ['{me}', '(want|wanted|wanna)', 'die']),

module.exports = new Listener({
  words: ['{me}', '(suicide|suicidal)'],
  category: 'suicide',
  cooldown: 10,
  priority: 0,
  run(bot, message, meta) {
    /*const analysis = sentiment(message.content);
    // if "suicide" is negated. ex: "I'm not suicidal."
    if (
      analysis.positive.includes('suicide') ||
      analysis.positive.includes('suicidal')
    ) {
      return false;
    }*/
    this.send(...MSG);
    return true;
  },
});

// People's lives is all that matters to us. Which is why we made Hanabi-sama<3
