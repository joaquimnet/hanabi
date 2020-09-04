const { Command } = require('@ponatech/bot');

const makeEmbed = require('../../util/makeEmbed');
const findPerson = require('../../util/findPerson');
//const Gifs = require('../../services/gifs');

module.exports = new Command({
  name: 'coffee',
  description: 'A cup of coffee to boost your spirits. ;)',
  aliases: ['kaffe'],
  category: 'reactions',
  examples: [' ', '@Kaffe#9547', '@blu#0111'],
  async run(bot, message, meta) {
    const target = await findPerson(message.mentions.members.first());

    let msg;
    if (target) {
      msg = `<@${meta.userId}> is drinking a cup of coffee. Would you like one too, ${target}? :coffee:`;
    } else {
      msg = `<@${meta.userId}>'s drinking a cup of coffee :coffee: `;
    }

    const embed = makeEmbed(
      msg,
     // await Gifs.random(['coffee']),
      undefined,
      message,
    );

    this.send({ embed });
  },
});