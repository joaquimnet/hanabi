const { Listener, stringMatch, COMMON_EXPRESSIONS } = require('sensum');
const Prompter = require('chop-prompter');

module.exports = new Listener({
  words: ['{be}', 'depressing'], // <- <- <- <- Being so awesome is depressing kek
  category: 'depression',
  cooldown: 15,
  priority: 0,
  async run(bot, message, meta) {
    // ask
    const name = meta.nickname ?? meta.username;
    const userResponse = await Prompter.message({
      channel: message.channel,
      question: `I'm getting that you are feeling depressed __${name}__, is this a correct statement to make?`,
      deleteMessage: false,
      userId: message.author.id,
    });

    if (!userResponse) {
      return true;
    }

    // if not yes
    if (!stringMatch(userResponse.first(), [COMMON_EXPRESSIONS.yes])) {
      meta.respond("Well, I am glad to hear you aren't feeling depressed!");
      return true;
    }

    // respond
    message.channel.startTyping().catch(() => {});
    await bot.wait(2000);

    meta
      .respond(
        "I'm sure that you are going through a lot to be feeling that way. You're truly a beautiful soul and I know that things can get tough.",
        'No one likes hearing that life is not easy, and it can be truly the hardest at some points in life.',
        "But in ten years from now, I promise you're going to look back at this time period in your life, and you're going to be *so truly happy* that you pushed through this.",
        "Allowing yourself to push yourself to true potential and see what you're truly capable of.",
        "You're a butterfly.",
        // 👌               👌                   👌                    👌
      )
      .then(() => message.channel.stopTyping())
      .catch(() => {});
    return true;
  },
});
