const { Command } = require('sensum');

module.exports = new Command({
  name: 'server',
  description: 'Server info.',
  category: 'info',
  aliases: ['srv'],
  // args: {
  //   argumentName: 'argumentType'
  // },
  delete: false,
  hidden: false,
  run(bot, message, ctx) {
    this.send(
      bot.lines(
        message.guild.name,
        // message.guild.name,
      ),
    );
  },
});
