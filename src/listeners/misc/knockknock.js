const { Listener } = require('@ponatech/bot');
const Prompter = require('chop-prompter');

module.exports = new Listener({
  words: 'knock knock',
  category: 'misc',
  cooldown: 1,
  priority: 5,
  async run(bot, message, meta) {
    const responseList1 = await Prompter.message({
      channel: message.channel,
      question: "Who's there?",
      userId: message.author.id,
      max: 1,
      timeout: 10000,
      deleteMessage: false,
    });

    // User didn't respond
    if (!responseList1) {
      // i sure hope its not Joe lmfao xD || this is a cry for help
      meta.respond("....*Who's there?*");
      return true;
    }

    const response1 = responseList1.first();

    const responseList2 = await Prompter.message({
      channel: message.channel,
      question: `${response1} who?`,
      userId: message.author.id,
      max: 1,
      timeout: 10000,
      deleteMessage: false,
    });

    // i didn't think this far
    if (!responseList2) {
      await meta.respond('***bruh***');
      return true;
    }

    const response2 = responseList2.first();

    await meta.respond(`*${response2}*... the heck!?`);

    return true;
  },
});