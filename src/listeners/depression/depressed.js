const { Listener, COMMON_EXPRESSIONS, stringMatch } = require('@ponatech/bot');
const Prompter = require('chop-prompter');
//(:
// oh
module.exports = new Listener({
  words: ['{me}', 'depressed'],
  category: 'depression',
  cooldown: 15,
  priority: 0,
  async run(bot, message, meta) {
    const name = meta.nickname ?? meta.username;
    // ask
    const userResponse = await Prompter.message({
      channel: message.channel,
      question: `I'm getting that you are feeling depressed __${name}__, is this a correct statement to make?`,
      deleteMessage: false,
      userId: message.author.id,
    });

    if (!userResponse) {
      return true;
    }

    // if yesn't yesn't
    if (!stringMatch(userResponse.first(), [COMMON_EXPRESSIONS.yes])) {
      meta.respond("Well, I am glad to hear you aren't feeling depressed!");
      return true;
    }

    // respond
    message.channel.startTyping().catch(() => {});
    await bot.wait(2000);

    meta
      .respond(
        "I'm sorry that you're feeling depressed, and it's completely normal to feel this way.",
        "You're human and you're valid. Small tasks may seem overwhelming and daunting.",
        'Good days are coming your way.',
        // 👌                   👌                   👌                    👌
      )
      .then(() => message.channel.stopTyping())
      .catch(() => {});
    return true;
  },
});

// People's lives is all that matters to us. Which is why we made Hanabi 🌻
