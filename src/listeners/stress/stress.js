const { Listener } = require('@ponatech/bot');

module.exports = new Listener({
  words: ['{me}', '(have|having)', 'stress'],
  category: 'stress',
  cooldown: 15,
  priority: 0,
  async run(bot, message, meta) {
    message.channel.startTyping().catch(() => {});
    await bot.wait(1500);

    meta.respond(
      'You speak of having stress, and I want you to know that I hear you. What you are feeling is completely normal.',
      'Day to day activities can be full of stress, and you must remind yourself, you have to give yourself free time.',
      'It can be easy getting wrapped up in our daily activities and becoming overwhelmed.',
      'Take some time for yourself and it will help relieve the stress, even if its a small amount.',
      'If you practice one fun daily activity a day, I promise it adds up!',
    )
      .then(() => message.channel.stopTyping())
      .catch(() => {});
    return true;
  },
});