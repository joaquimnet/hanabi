const { EventHandler } = require('sensum');

const Profile = require('../../models/profile');

module.exports = new EventHandler({
  name: 'achievement',
  async run(bot, { profile, achievement, channel }) {
    bot.logger.info(
      `${
        bot.users.cache.get(profile._id)?.tag ?? `(${profile._id})`
      } earned the ${achievement.displayName} achievement.`,
    );
    await Profile.updateOne(
      { _id: profile._id, 'achievements._id': achievement.flag },
      { 'achievements.$.completedAt': new Date() },
    );

    if (channel) {
      await channel
        .send({
          embed: {
            title: achievement.displayName,
            description: `You've just unlocked an achievement!`,
            fields: [{ name: 'Description', value: achievement.description }],
            thumbnail: {
              url: 'https://i.imgur.com/Jj4obT3.png',
            },
            color: bot.colorInt('#debd18'),
          },
        })
        .catch(() => {
          // TODO: Add achievement notification to the user.
        });
    } else {
      // TODO: Add achievement notification to the user.
    }
  },
});
