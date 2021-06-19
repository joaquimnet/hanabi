const { Command } = require('sensum');

module.exports = new Command({
  name: 'shrug',
  description: 'Shrug~',
  aliases: ['meh', 'idk', 'dunno'],
  category: 'funny',
  delete: true,
  run() {
    this.send('¯\\_(ツ)_/¯');
  },
});
