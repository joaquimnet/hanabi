const { Listener } = require('sensum');

module.exports = new Listener({
  words: ['{me}', 'happy'],
  category: 'emotions',
  cooldown: 10,
  priority: 0,
  async run(bot, message, meta) {
    const prefix = meta.settings.prefix;
    message.channel.startTyping().catch(() => {});
    await bot.wait(3000);
    meta
      .respond(
        'It makes me so happy to hear that you are happy. What things make you happy?',
        'I like the sunshine, the rain.',
        'I like roses, and lilies..',
        'Ooooh!',
        'And poems! Would you like to hear one?',
        'If so, say ' + prefix + 'poem !',
      )
      .then(() => message.channel.stopTyping())
      .catch(() => {});
    return true;
  },
});
