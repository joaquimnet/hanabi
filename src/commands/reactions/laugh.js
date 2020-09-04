const { Command } = require('@ponatech/bot');

const makeEmbed = require('../../util/makeEmbed');
const findPerson = require('../../util/findPerson');
//const Gifs = require('../../services/gifs');

module.exports = new Command({
  name: 'laugh',
  description: 'Lmao! :laughing:',
  aliases: ['laughing', 'laughter'],
  category: 'reactions',
  examples: [' ', '@Kaffe#9547', '@blu#0111'],
  async run(bot, message, meta) {
    const target = await findPerson(message.mentions.members.first());

    let msg;
    if (target) {
      msg = `<@${meta.userId}> is laughing at ${target}. :laughing: How funny!`;
    } else {
      msg = `<@${meta.userId}>'s laughing :laughing: `;
    }

    const embed = makeEmbed(
      msg,
      //await Gifs.random('laugh'),
      undefined,
      message,
    );

    this.send({ embed });
  },
});