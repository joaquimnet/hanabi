const { Listener } = require('sensum');

const MSG = require('./suicide-message');
//(['{me}', '(suicide|suicidal)'], ['{me}', '(suicide|suicidal)'], ['{me}', 'kms'], ['{me}', 'feel', 'dying'], ['{me}','commit', 'suicide'], ['(take|taking|end|ending)', '(own|my)', 'life'], ['{me}', '(think|thinking|thought)', '(about|of)', 'death'], ['{me}', '(want|wanna|gonna|going to)', '(off|kill)', 'myself'], ['{me}', '(off|offing|kill|killing)', 'myself'], ['jeg', 'vil', 'do'], ['{me}', '(want|wanted|wanna)', 'die']),

module.exports = new Listener({
  words: ['everything would be better without me', '(here|existing)'],
  // haha true
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
