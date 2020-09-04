const { Command } = require('@ponatech/bot');

module.exports = new Command({
  name: 'balance',
  description: 'Shows you how much currency you have.',
  category: 'currency',
  aliases: ['bal', 'money', 'currency', 'monie', 'monies', 'yen'],
  run(bot, message, meta) {
    this.send(
      `Hello ${message.author.username}!`,
      `You currently have **${meta.profile.money}¥**!`,
    );
  },
});
