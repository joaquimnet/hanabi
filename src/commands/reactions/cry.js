const { Command } = require('@ponatech/bot');

const makeEmbed = require('../../util/makeEmbed');
const findPerson = require('../../util/findPerson');
// const Gifs = require('../../services/gifs');

module.exports = new Command({
  name: 'cry',
  description: 'sometimes.. you just gotta cry it out',
  aliases: ['sob', 'tear'],
  category: 'reactions',
  examples: [' ', '@Kaffe#9547', 'blu#0111'],
  async run(bot, message, meta) {
    const target = await findPerson(message.mentions.members.first());

    let cryingMessage;
    if (target) {
      // Peepeepoopoo 👁‍🗨 ✔✔✔✔
      cryingMessage = `${target} made <@${meta.userId}> cry, what did you do? :'c `;
    } else {
      cryingMessage = `<@${meta.userId}>'s crying :'(`;
    }

    const embed = makeEmbed(
      cryingMessage,
      // await Gifs.random('cry'),
      undefined,
      message,
    );

    this.send({ embed });
  },
});