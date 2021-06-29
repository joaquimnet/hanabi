const { Listener } = require('sensum');

module.exports = new Listener({
  words: [
    '{me}',
    '(would|want|wanna)',
    '(be|feel)',
    '(pretty|beautiful|gorgeous|handsome|lovely|cute|cool)',
  ],
  category: 'ED',
  cooldown: 6000,
  globalCooldown: 1800,
  priority: 0,
  async run(bot, message, meta) {
    message.channel.startTyping().catch(() => {});
    await bot.wait(500);
    meta.respond(
      'Hey there. I understand how you feel. Let me tell you something:orange_heart:',
    );
    message.channel.startTyping().catch(() => {});
    await bot.wait(3000);
    meta.respond(
      "Did you know that it's __scientifically proven__ that we perceive ourselves differently from other people?",
      'No matter how you feel about yourself, I promise someone cherishes you. Did you know that you stumble across people your whole life that develop crushes on you?',
      'The ride home? Someone probably gazed upon you and thought you were the most beautiful human being they ever laid their eyes on.',
    );
    message.channel.startTyping().catch(() => {});
    await bot.wait(5000);
    meta.respond(
      "Even if you don't like the way you look, I think you're quite amazing :orange_heart:",
      "We don't seem to appreciate our looks enough. I promise that you're much more attractive than you think.",
    ),
      message.channel.startTyping().catch(() => {});
    await bot.wait(5000);
    meta.respond(
      'With that being said, it **is** okay and completely valid to feel the way you do, we all experience it.',
      'I hope you see just how amazing and adorable you are soon :orange_heart: uwu',
    );
    message.channel.stopTyping();
    message.channel.stopTyping();
    message.channel.stopTyping();
    message.channel.stopTyping();
    return true;
  },
});
