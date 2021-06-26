const { Listener } = require('sensum');

module.exports = new Listener({
  words: [
    '{me}',
    '(have|having|going through)',
    '(burnt out|burnout|burn out)',
  ],
  category: 'misc',
  cooldown: 6000,
  priority: 0,
  // Burnout? Never played that game, not super into racing games. I'm not a racist.
  async run(bot, message, meta) {
    message.channel.startTyping().catch(() => {});
    await message.client.wait(5000);

    try {
      await meta.respond(
        `Burnout is never fun for anyone.`,
        `If you are already experiencing burnout, you may feel inclined to try these tips out.`,
        `Try and pause whatever you are doing. If you have a time limit on a deadline, try taking 5-10 minutes to get up and stretch.`,
        `What needs to be done, needs to be done. Feeling burnt out on a task can feel inevitable, however-- you can aide in the healing process.`,
      );
      message.channel.startTyping().catch(() => {});
      await bot.wait(3000);
      meta.respond(
        `Before accepting anymore commitments, to avoid getting overwhelmed, try to pause and take a moment to walk through everything that you will need to do if you agree. Ask yourself if you really have the time and energy to complete said tasks.`,
        `Consider whether doing it offers value to you.`,
      ),
        message.channel.startTyping().catch(() => {});
      await bot.wait(5000);
      meta.respond(
        `Setting boundaries involves learning to say no. You're not lazy, selfish, or mean for declining a request for your time. We all need time to recharge. Don't force yourself to say yes in fear that someone will get angry with you for saying no.`,
        `Try paying attention to your needs. Are you getting enough sleep? Spending time with loved ones? Spending time *alone*? Try to get some sort of physical activity (if you sit at a desk all day, try some sitting stretches!). Try to eat properly, and stay hydrated.`,
        `It might benefit you to try meditation or yoga, or some other form of mindfulness practices-- for improved relaxation.`,
      ),
        message.channel.startTyping().catch(() => {});
      await bot.wait(5000);
      meta.respond(
        `If burnout gets severe enough, you may want to try talking to a therapist-- with this being said, therapists can be fairly expensive, and not everyone has health insurance to help pay for it. If you cannot afford a therapist, please consider doing the above. Journaling your moods can also help stabilize if done in routine.`,
        `Try to identify immediate changes you can make. Evaluate your existing committments and consider cancelling or rescheduling a few. The immediate relief that this action brings may honestly surprise you.`,
      );
    } catch (err) {
      bot.logger.error(err);
    }
    message.channel.stopTyping();
    message.channel.stopTyping();
    message.channel.stopTyping();
    message.channel.stopTyping();
    return true;
  },
});
