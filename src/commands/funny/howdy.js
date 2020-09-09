const { Command } = require('@ponatech/bot');

module.exports = new Command({
  name: 'howdy',
  description: 'Greetings!',
  aliases: ['yeehaw'],
  delete: true,
  category: 'funny',
  async run(_, __, meta) {
    // Yeeeeeeeeeeeeeeeeeeeehaw! 🐄
    const msg = await meta.respond('Yeehaw!');
    msg.react('🤠').catch(() => {});
  },
});
