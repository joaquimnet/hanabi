const { Listener } = require('sensum');

module.exports = new Listener({
  words: ['{me}', 'anxious'],
  category: 'anxiety',
  cooldown: 1800,
  globalCooldown: 1800,
  priority: 0,
  async run(bot, message, meta) {
    message.channel.startTyping().catch(() => {});
    // vvvvvvvvvvvvvvvv
    await bot.wait(5000);
    // ^^^^^^^^^^^^^^^^
    meta
      .respond(
        'I am sorry that you are feeling anxious, what kind of things do you like to do to help put yourself at ease?',
        'Sometimes, taking a nap or drinking a hot beverage does it for me.',
        'Video games are also a great de-stressor.',
        "If you're feeling up to it, may I suggest possibly going for a walk?",
        'It is completely valid and okay if you cannot.',
        'Anything that helps you feel better, is what matters. :orange_heart:',
      )
      .then(() => message.channel.stopTyping())
      .catch(() => {});
    return true;
  },
});
