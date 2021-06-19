const { Command } = require('sensum');

module.exports = new Command({
  name: 'roll',
  description: 'Rolls a die :v',
  category: 'other',
  run() {
    const roll = Math.floor(Math.random() * 6) + 1;
    const emotes = ['one', 'two', 'three', 'four', 'five', 'six'];
    this.send(`You rolled a :${emotes[roll - 1]}:`);
  },
});
