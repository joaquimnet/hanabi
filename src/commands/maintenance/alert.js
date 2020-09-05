const { Command, Permission } = require('@ponatech/bot');

const { Alert } = require('../../services');

module.exports = new Command({
  name: 'alert',
  description: "Tests Hanabi's alert feature.",
  permission: Permission.BOT_SUPPORT,
  category: 'maintenance',
  requiredArgs: ['type'],
  async run(bot, message, meta) {
    await Alert.send({
      type: meta.args[0],
      bot,
      message: meta.content,
      thumbnail: message.author.avatarURL(),
    });
    meta.respond('Done!');
  },
});
