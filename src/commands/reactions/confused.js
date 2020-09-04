const { Command } = require('@ponatech/bot');

const makeEmbed = require('../../util/makeEmbed');
const findPerson = require('../../util/findPerson');
//const Gifs = require('../../services/gifs');

module.exports = new Command({
  name: 'confused',
  description: 'ever feel like you don\'t understand what\'s going on?',
  aliases: ['confuse', 'huh', 'confusion'],
  category: 'reactions',
  examples: [' ', '@Kaffe#9547', '@blu#0111'],
  async run(bot, message, meta) {
    const target = await findPerson(message.mentions.members.first());

    let msg;
    if (target) {
      msg = `<@${meta.userId}> is confused by what you said, ${target} Maybe try clarifying a little more?`;
    } else {
      msg = `<@${meta.userId}> is **confused** :thinking:`;
    }

    const embed = makeEmbed(
      msg,
     // await Gifs.random(['confused']),
      undefined,
      message,
    );

    this.send({ embed });
  },
});