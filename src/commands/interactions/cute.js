const { Command } = require("@ponatech/bot");

const createInteractionCommand = require("../../util/createInteractionCommand");
// no u
// cute stuff c;
module.exports = new Command({
  name: "cute",
  aliases: ["pretty"],
  description: "Tell someone they're cute :smiling_face_with_3_hearts:",
  args: ["target"],
  delete: true,
  category: "interactions",
  usage: "{target}",
  examples: ["@Kaffe#9547", "@blu#0111"],
  async run(bot, message, meta) {
    const cute = createInteractionCommand(
      `Hey there! \n${meta.tag} said you're cute. ;)`,
      "cute",
      message
    );

    cute().catch((err) => this.client.emit("error", err));
  },
});
