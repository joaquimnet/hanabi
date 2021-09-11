const { Achievement } = require('../../framework/achievements/achievement');

const group = require('./group');

module.exports = new Achievement({
  flag: 'COMMAND_5',
  displayName: 'Fireworks II',
  description: 'Use Hanabi commands 5 times.',
  group,
  async evaluate(bot, profile) {
    const currentAchievement = profile.getAchievementProgress(this.flag);

    return currentAchievement.progress >= 5;
  },
});
