const { Listener, COMMON_EXPRESSIONS, stringMatch } = require('sensum');
const Prompter = require('chop-prompter');

//const format = require('../../util/format');
// const { MessageAttachment } = require('discord.js');

module.exports = new Listener({
  words: ['{me}', 'angry'],
  category: 'emotions',
  cooldown: 60,
  priority: 0,
  async run(bot, message, meta) {
    message.channel.startTyping().catch(() => {});
    await bot.wait(1000);
    const responseList1 = await Prompter.message({
      channel: message.channel,
      userId: message.author.id,
      question: bot.lines(
        `I hear that you are angry, I would like to understand why. Would you like to talk about it?`,
      ),
      max: 1,
      deleteMessage: false,
    });

    message.channel.stopTyping();
    const response1 = responseList1 ? responseList1.first() : '';

    if (stringMatch(response1, [COMMON_EXPRESSIONS.yes])) {
      message.channel.startTyping().catch(() => {});
      await bot.wait(1000);
      meta.respond(
        // 🍿 🤔 *eats popcorn* owo >u<
        `Oh heavens... That sounds horrible and I'm quite honestly sorry that happened to you.`,
        `What do you suppose you're going to do now about the situation? Maybe seperate yourself from such?`,
        `Maybe make a plan to have a good rest of your morning/evening?`,
      );
      message.channel.stopTyping();
    } else {
      message.channel.startTyping().catch(() => {});
      await bot.wait(2000);
      meta.respond(
        `I understand that you'd prefer to keep this to yourself. I am still here if you'd like to open up about it.`,
        `I really do hope that this anger you are feeling fades away and you have a great rest of your day!`,
      );
    }
    message.channel.stopTyping();
    //  .catch(() => {});
    return false;
  },
});
