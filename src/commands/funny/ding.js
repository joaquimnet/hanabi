const { Command } = require('@ponatech/bot');

module.exports = new Command({
  name: 'ding',
  description: 'ring da door bell',
  delete: false,
  category: 'funny',
  run() {
    this.send('Dong!').then((msg) => {
      msg.react('🚪').catch(() => {});
    });
  },
});
