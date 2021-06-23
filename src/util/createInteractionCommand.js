// go get this VVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
const findPerson = require('./findPerson');
// i'll get this VVVVVVVVVVV
const makeEmbed = require('./makeEmbed');
// const Gifs = require('../services/gifs');

module.exports = (text, image, message) => async () => {
  const deleteAfterDelay = (msg, delay) => {
    message.client.setTimeout(() => {
      msg.delete().catch(() => {});
    }, delay);
  };

  const target = await findPerson(message.mentions.members.first());

  if (!target) {
    const msg = await message.channel
      .send("I couldn't find that person.")
      .catch(() => {});
    deleteAfterDelay(msg, 3000);
    return;
  }

  if (target.id === message.author.id) {
    const msg = await message.channel
      .send("You can't do that to yourself, silly. :)")
      .catch(() => {});
    deleteAfterDelay(msg, 3000);
    return;
  }

  // const image = await Gifs.random(tags);

  const embed = makeEmbed(text, image, message);
  const bot = message.client;
  const prefix = message.client.config.defaultSettings.prefix;

  try {
    const targetProfile = await bot.getProfile(target.id);
    console.log('target profile', targetProfile);
    if (!targetProfile) return;
    if (!targetProfile.flags.canReceiveDMs) {
      message.channel
        .send(
          bot.lines(
            "I can't DM that person due to them having dm perms off!",
            `If they would like to receive messages via dm, they can use the ${prefix}donotdm command to opt into dm messages!`,
          ),
        )
        .catch(() => {});
      return;
    }
    if (!targetProfile.flags.hasReceivedFirstDM) {
      await target.send(
        `This is an interaction, if you would like to opt out of future interactions, please use the command ${prefix}donotdm`,
      );
      targetProfile.flags.hasReceivedFirstDM = true;
      await targetProfile.save();
    }
    await target.send({ embed });
  } catch (err) {
    message.client.logger.error(err);
    message.channel.send("I can't DM that person. ;-;").catch(() => {});
  }
};
