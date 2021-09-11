const { EventHandler } = require('sensum');

const Profile = require('../../models/profile');

module.exports = new EventHandler({
  name: 'achievement',
  async run(bot, { profile, achievement, channel }) {
    const user = bot.users.cache.get(profile._id);
    bot.logger.info(
      `${user?.tag ?? `(${profile._id})`} earned the ${
        achievement.displayName
      } achievement.`,
    );
    // TODO: consider moving this into the achievements manager since it contains internals
    await Profile.updateOne(
      { _id: profile._id, 'achievements._id': achievement.flag },
      { 'achievements.$.completedAt': new Date() },
    );
    bot.saveMetric('achievement', {
      userId: profile._id,
      achievement: achievement.flag,
    });

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
            author: {
              iconURL: user?.avatarURL(),
              name: 'Achievement Unlocked',
            },
            color: bot.colorInt('#debd18'),
          },
        })
        .catch((err) => {
          bot.emit('error', err);
          // return bot.notifications
          //   .create(
          //     new Notification({
          //       title: achievement.displayName,
          //       description: bot.lines(
          //         "You've unlocked an achievement!",
          //         '',
          //         '**Description**',
          //         achievement.description,
          //       ),
          //       thumbnail: 'https://i.imgur.com/Jj4obT3.png',
          //       color: bot.colorInt('#debd18'),
          //     }),
          //   )
          //   .catch((err) => bot.emit('error', err));
        });
    } else {
      // bot.notifications
      //   // .create(
      //   //   new Notification({
      //   //     title: achievement.displayName,
      //   //     description: bot.lines(
      //   //       "You've unlocked an achievement!",
      //   //       '',
      //   //       '**Description**',
      //   //       achievement.description,
      //   //     ),
      //   //     thumbnail: 'https://i.imgur.com/Jj4obT3.png',
      //   //     color: bot.colorInt('#debd18'),
      //   //   }),
      //   // )
      //   // .catch((err) => bot.emit('error', err));
    }
  },
});
