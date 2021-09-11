const { Achievement } = require('../../framework/achievements/achievement');

const group = require('./group');

module.exports = new Achievement({
  flag: 'COMMAND_50',
  displayName: 'Fireworks IV',
  description: 'Use Hanabi commands 50 times.',
  group,
  async evaluate(bot, profile) {
    const currentAchievement = profile.getAchievementProgress(this.flag);

    return currentAchievement.progress >= 50;
  },
});
