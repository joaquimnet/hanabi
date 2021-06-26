const { Command, Permission } = require('sensum');
const { MessageButton, MessageActionRow } = require('discord-buttons');

module.exports = new Command({
  name: 'metric',
  description: 'Test command',
  category: 'maintenance',
  hidden: true,
  runIn: ['guild', 'text', 'dm'],
  permission: Permission.BOT_ADMIN,
  init(bot) {
    bot.buttons.set('metric_yes', async (button) => {
      await button.message.edit(button.message.content, {
        component: null,
        embed: button.message.embeds?.[0],
      });
    });
    bot.buttons.set('metric_delete', async (button) => {
      await button.message.delete();
    });
  },
  async run(bot, message, ctx) {
    const button = new MessageButton()
      .setID(`metric_yes`)
      .setEmoji('◀️')
      .setStyle('blurple');
    const button2 = new MessageButton()
      .setID('metric_delete')
      .setEmoji('▶️')
      .setStyle('blurple');
    const row = new MessageActionRow().addComponents(button, button2);

    this.send({
      embed: {
        title: 'Button Testing',
        thumbnail: { url: bot.user.avatarURL() },
        author: {
          name: message.author.username,
          iconURL: message.author.avatarURL(),
        },
      },
      component: row,
    });
  },
});
