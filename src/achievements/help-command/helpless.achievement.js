const { Achievement } = require('../../framework/achievements/achievement');

const group = require('./group');

module.exports = new Achievement({
  flag: 'HELP_1',
  displayName: 'Helpless Flower',
  description: 'Use the help command one time.',
  group,
  async evaluate() {
    return true;
  },
});
