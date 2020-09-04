const { Command } = require('@ponatech/bot');

const makeEmbed = require('../../util/makeEmbed');
const findPerson = require('../../util/findPerson');
//const Gifs = require('../../services/gifs');

module.exports = new Command({
  name: 'smug',
  description: 'teehee gottem~',
  // args: ['target'],
  aliases: [],
  category: 'reactions',
  examples: [' ', '@Kaffe#9547', '@blu#0111'],
  async run(bot, message, meta) {
    const target = await findPerson(message.mentions.members.first());

    let cryingMessage;
    if (target) {
      cryingMessage = `<@${meta.userId}> is smug. How do you feel ${target}? ~`;
    } else {
      cryingMessage = `<@${meta.userId}> is feeling awfully smug ~ `;
    }

    const embed = makeEmbed(
      cryingMessage,
      //await Gifs.random('smug'),
      message,
    );

    this.send({ embed });
  },
});
