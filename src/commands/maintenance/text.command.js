const { Command, Permission } = require('sensum');

module.exports = new Command({
  name: 'text',
  description: "Add text to Hanabi's database.",
  category: 'maintenance',
  aliases: ['txt'],
  args: {
    label: { type: 'string', min: 1 },
    category: { type: 'string', min: 1 },
  },
  permission: Permission.BOT_ADMIN,
  delete: false,
  hidden: true,
  run(bot, message, ctx) {
    this.send(
      bot.lines(
        '```json',
        JSON.stringify(
          {
            ...ctx.args,
            content: ctx.content,
          },
          null,
          2,
        ),
        '```',
      ),
    );
  },
});
