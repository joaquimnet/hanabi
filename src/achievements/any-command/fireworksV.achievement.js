const { Achievement } = require('../system/achievement');

const group = require('./group');

module.exports = new Achievement({
  flag: 'COMMAND_100',
  displayName: 'Fireworks V',
  description: 'Use Hanabi commands 100 times.',
  group,
  async evaluate(bot, profile) {
    const currentAchievement = profile.getAchievementProgress(this.flag);

    return currentAchievement.progress >= 100;
  },
});
