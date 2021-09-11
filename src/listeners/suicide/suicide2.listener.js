const { Listener } = require('sensum');

const MSG = require('./suicide-message');

module.exports = new Listener({
  words: ['{me}', 'feel', 'dying'],
  category: 'suicide',
  cooldown: 10,
  priority: 0,
  run(bot, message, meta) {
    this.send(...MSG);
    return true;
  },
});

// People's lives is all that matters to us. Which is why we made Hanabi-sama<3
