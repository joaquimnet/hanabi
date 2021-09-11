const { Achievement } = require('../system/achievement');

const group = require('./group');

module.exports = new Achievement({
  flag: 'COMMAND_10',
  displayName: 'Fireworks III',
  description: 'Use Hanabi commands 10 times.',
  group,
  async evaluate(bot, profile) {
    const currentAchievement = profile.getAchievementProgress(this.flag);

    return currentAchievement.progress >= 10;
  },
});
