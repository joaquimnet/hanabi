const { EventHandler } = require('sensum');

const Achievement = require('./achievement.model.v1');

module.exports = new EventHandler({
  name: 'ready',
  async run(bot) {
    const achievementList = bot.achievements.cache.array();
    const achievementKeys = [...bot.achievements.cache.keys()];

    await Achievement.bulkWrite(
      achievementList
        .map((achievement) => {
          return {
            updateOne: {
              filter: { _id: achievement.flag },
              update: {
                _id: achievement.flag,
                flag: achievement.flag,
                displayName: achievement.displayName,
                description: achievement.description,
                group: {
                  flag: achievement.group.flag,
                  displayName: achievement.group.displayName,
                },
              },
              upsert: true,
            },
          };
        })
        .concat({
          deleteMany: {
            filter: { _id: { $nin: achievementKeys } },
          },
        }),
    );
  },
});
