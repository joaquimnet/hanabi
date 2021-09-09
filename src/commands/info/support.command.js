const { Command } = require('sensum');

module.exports = new Command({
  name: 'support',
  description: "Shows the invite for Hanabi's support server.",
  category: 'info',
  run() {
    return this.send('https://discord.gg/6EHFcgMbcb');
  },
});
