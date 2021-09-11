const { Achievement } = require('../system/achievement');

const group = require('./group');

module.exports = new Achievement({
  flag: 'LISTENER_1',
  displayName: 'Love',
  description: 'Talk to Hanabi 1 time.',
  group,
  async evaluate() {
    return true;
  },
});
