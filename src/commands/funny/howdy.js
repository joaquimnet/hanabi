const { Command } = require('@ponatech/bot');

module.exports = new Command({
  name: 'howdy',
  description: 'greetings!',
  aliases: ['yeehaw'],
  delete: true,
  category: 'funny',
  run() {
    // Yeeeeeeeeeeeeeeeeeeeehaw! 🐄
    this.send('Yeehaw!').then((msg) => {
      msg.react('🤠').catch(() => {});
    });
  },
});
