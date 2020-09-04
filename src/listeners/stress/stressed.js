const { Listener } = require('@ponatech/bot');


module.exports = new Listener({
  words: ['{me}', 'stressed'],
  category: 'stress',
  cooldown: 15,
  priority: 0,
  async run(bot, message, meta) {
    message.channel.startTyping().catch(() => {});
    await bot.wait(1500);

    // reminder
    meta.respond(
      "I'm hearing that you're feeling stressed, if I'm correct. Do you have any daily activities you like to do? A short walk can help give you some clarity in situations like these.",
      'I cannot imagine what you are going through to have such an intense emotion. Stress is never fun, for anyone.',
      'Trying to distract your brain in even the slightest ways, can go a long way! Try doing something you enjoy to distract yourself for even a little bit.',
      'Fun activities can include walking your pets (if you have any), drawing, playing a *stress-free* game, or even watching your favorite television show!',
      "It'll be hard to not think about your stress in the beginning, and that is completely normal. But it will fade as time goes on and you're enjoying yourself! Take some time for yourself,",
      '*you deserve it*.',
    )
      .then(() => message.channel.stopTyping())
      .catch(() => {});
    return true;
  },
});