/*
const findPerson = require('./findPerson');
const makeEmbed = require('./makeEmbed');
const Gifs = require('../services/gifs');

module.exports = (text, tags, message) => async () => {
  const deleteAfterDelay = (msg, delay) => {
    message.client.setTimeout(() => {
      msg.delete().catch(() => {});
    }, delay);
  };

  const target = await findPerson(message.mentions.members.first());

  if (!target) {
    const msg = await message.channel.send("I couldn't find that person.").catch(() => {});
    deleteAfterDelay(msg, 3000);
    return;
  }

  const image = await Gifs.random(tags);

  const embed = makeEmbed(text, image, message);

  target.send({ embed }).catch(() => {
    message.channel.send('I can\'t DM that person. ;-;').catch(() => {});
  });
};
*/