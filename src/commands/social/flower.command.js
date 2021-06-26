const { Command } = require('sensum');
const moment = require('moment');

const Profile = require('../../models/profile');

const timeToNextDelivery = (lastFlower) => {
  const now = new moment();
  const lastUsed = moment(lastFlower);
  const diff = now.diff(lastUsed);
  // COOLDOWN TO SEND flower
  const d24 = moment.duration(3, 'h');
  return d24 - diff;
};

const format = (time) => moment.duration(time).format('HH[H] mm[M] ss[S]');

module.exports = new Command({
  name: 'flower',
  description: 'Give someone a flower! Check how many flowers you have!',
  category: 'social',
  aliases: ['rep', 'flowers'],
  usage: '[@mention]',
  async run(bot, message, meta) {
    const mention = message.mentions.members.first();
    const profile = await Profile.getOrCreate(meta.userId);
    const next = timeToNextDelivery(profile.flower.time);
    if (!mention || (mention && mention.user.id === meta.userId)) {
      this.send(
        // Look at profile.js for the schema
        `:sunflower: **| ${
          message.member.nickname ?? message.author.username
        }**! You have received **${
          profile.flower.count
        }** flowers so far! What a lovely bunch you have :orange_heart::smiling_face_with_3_hearts:`,
      );
      if (next <= 0) {
        this.send(':timer: **|** You have **1** flower to send!');
      } else {
        this.send(`:timer: **|** Your next flower is in **${format(next)}**`);
      }
      return;
    }

    // give flowers
    if (next <= 0) {
      this.send(
        `:sunflower: **| ${mention.user.username}**! You got a flower from **${message.author.username}**!:smiling_face_with_3_hearts:`,
      );
      profile.flower.time = new Date();
      await profile.save();
      await Profile.getOrCreate(mention.user.id);
      await Profile.findOneAndUpdate(
        { _id: mention.user.id },
        { $inc: { 'flower.count': 1 } },
      );
    } else {
      this.send(
        `:timer: **|** Oh no **${
          message.author.username
        }** you have to wait **${format(next)}**`,
      );
    }
  },
});
