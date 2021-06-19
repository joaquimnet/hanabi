const { Command, Permission } = require('sensum');

const { Alert } = require('../../services');

module.exports = new Command({
  name: 'alert',
  description: "Tests Hanabi's alert feature.",
  permission: Permission.BOT_SUPPORT,
  category: 'maintenance',
  args: {
    type: {type: 'number', convert: true}
  },
  async run(bot, message, meta) {
    await Alert.send({
      type: meta.args.type,
      bot,
      message: meta.contentFull,
      thumbnail: message.author.avatarURL(),
    });
    meta.respond('Done!');
  },
});
