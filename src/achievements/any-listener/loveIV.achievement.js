const { Achievement } = require('../../framework/achievements/achievement');

const group = require('./group');

module.exports = new Achievement({
  flag: 'LOVE_50',
  displayName: 'Love IV',
  description: 'Talk to Hanabi 50 times.',
  group,
  async evaluate(bot, profile) {
    const currentAchievement = profile.getAchievementProgress(this.flag);

    return currentAchievement.progress >= 50;
  },
});
