const { Command, Permission } = require('sensum');

module.exports = new Command({
  name: 'memory',
  description: '',
  category: 'admin',
  aliases: ['mem'],
  permission: Permission.BOT_ADMIN,
  // args: [''],
  // delete: ,
  hidden: true,
  run(bot, message, ctx) {
    const memory = bot.memory;

    const botUsage = Math.trunc(memory.bot / 1024 / 1024) + 'MB';

    const totalPercentUsage = Math.trunc(memory.percent * 100);

    this.send(
      bot.lines(
        `🔋 Bot Memory Usage: **${botUsage}** --- 🧮 **${totalPercentUsage}%** Used.`,
      ),
    );
  },
});
