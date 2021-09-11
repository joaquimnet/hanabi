const { Achievement } = require('../../framework/achievements/achievement');

const group = require('./group');

module.exports = new Achievement({
  flag: 'HELP_5',
  displayName: 'Helpless Flower II',
  description: 'Use the help command 5 times.',
  group,
  async evaluate(bot, profile) {
    const currentAchievement = profile.getAchievementProgress(this.flag);

    return currentAchievement.progress >= 5;
  },
});
