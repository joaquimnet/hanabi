const { Command, Permission } = require('sensum');

module.exports = new Command({
  name: 'alert',
  description: "Tests Hanabi's alert feature.",
  permission: Permission.BOT_SUPPORT,
  category: 'maintenance',
  args: {
    level: {
      type: 'enum',
      values: ['debug', 'info', 'success', 'warn', 'danger'],
    },
  },
  async run(bot, message, ctx) {
    await bot.alerts._sendAlert(
      'This is a test.',
      ctx.content,
      message.author.avatarURL(),
      ctx.args.level,
    );
    this.send('Done!');
  },
});
