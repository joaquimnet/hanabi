const { Achievement } = require('../system/achievement');

const group = require('./group');

module.exports = new Achievement({
  flag: 'COMMAND_1',
  displayName: 'Fireworks',
  description: 'Use a Hanabi command 1 time.',
  group,
  async evaluate() {
    return true;
  },
});
