const { Command } = require('sensum');

module.exports = new Command({
  name: 'invite',
  description: 'Generates an invite for Hanabi.',
  aliases: ['inviteme'],
  category: 'other',
  hidden: false,
  async run(bot, message, meta) {
    const invite = `https://discord.com/oauth2/authorize?client_id=${process.env.CLIENT_ID}&permissions=388160&scope=bot`;
    meta.respond({
      embed: {
        title: 'Invite Hanabi!',
        description: "I'm so happy you want to invite me c:",
        fields: [
          {
            name: 'Invite Link',
            value: invite,
          },
        ],
        thumbnail: { url: bot.user.avatarURL({ size: 1024 }) },
        color: bot.colorInt('#f0b7d3'),
      },
    });
  },
});
