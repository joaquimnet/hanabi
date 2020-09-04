const { Listener } = require("@ponatech/bot");

module.exports = new Listener({
  words: ["{me}", "(have|having)", "anxiety"],
  category: "anxiety",
  cooldown: 15,
  priority: 0,
  async run(bot, message, meta) {
    message.channel.startTyping().catch(() => {});
    await message.client.wait(5000);

    try {
      message.channel.stopTyping();
      await meta.respond(
        "I'm hearing that you're having feelings of anxiety, if I'm correct.",
        "I personally hate anxiety and I understand just how bad it can feel.",
        "Never knowing if it is going to leave, unsure of your comfort zones/things.",
        "But like the leaves in the fall, anxiety does wither away.",
        "It's like the seasons, and I promise,",
        "**you will be okay in the end.**"
      );
    } catch (err) {
      bot.logger.error(err);
    }
    return true;
  },
});
