const { Command } = require("@ponatech/bot");

const createInteractionCommand = require("../../util/_createInteractionCommand");

module.exports = new Command({
  name: "PatPat",
  description: "a gentle way of saying.. there-there.",
  aliases: ["pat"],
  args: ["target"],
  delete: true,
  category: "interactions",
  usage: "{target}",
  examples: ["@Kaffe#9547", "@blu#0111"],
  async run(bot, message, meta) {
    // const{args} = meta;
    const pat = createInteractionCommand(
      `*pat-pat* \n${meta.callerTag} has pat you c:`,
      "pat",
      message
    );

    pat().catch((err) => this.client.emit("error", err));
  },
});
