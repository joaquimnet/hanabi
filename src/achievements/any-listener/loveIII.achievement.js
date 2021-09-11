const { Achievement } = require('../system/achievement');

const group = require('./group');

module.exports = new Achievement({
  flag: 'LOVE_10',
  displayName: 'Love III',
  description: 'Talk to Hanabi 5 times.',
  group,
  async evaluate(bot, profile) {
    const currentAchievement = profile.getAchievementProgress(this.flag);

    return currentAchievement.progress >= 10;
  },
});
