const { Listener } = require('sensum');
const Prompter = require('chop-prompter');

module.exports = new Listener({
  words: ['{me}', 'hungry'],
  category: 'emotions',
  cooldown: 10,
  priority: 0,
  delete: false,
  async run(bot, message, meta) {
    await bot.wait(3000)
    Prompter.message({
      channel: message.channel,
      question:
        'What would you like to eat? May I ask what your favorite food is?',
      userId: message.author.id,
      max: 1,
      timeout: 10000,
      delete: false,
    }).then((responses) => {
      // If no responses, the time ran out
      if (!responses) {
        meta.respond('No time for questions? I see.');
        return false;

      }

      // Gets the first message in the collection
      const response = responses.first();

      // Respond
      meta.respond(
        `**${response}**? I like that too! Not my favorite tho... :P`,
      );
    });
    return false;
  },
});
