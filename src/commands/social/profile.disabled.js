const { Command } = require('sensum');
const { MessageEmbed } = require('discord.js');
const { MessageButton } = require('discord-buttons');

const Profile = require('../../models/profile');
const findPerson = require('../../util/findPerson');

module.exports = new Command({
  name: 'poo',
  description: 'pee',
  category: 'dookie',
  aliases: ['farts'],
  args: {
    target: { type: 'string', optional: true },
  },
  delete: false,
  hidden: true,
  init(bot) {
    bot.buttons.set('follow_button', async (button) => {
      const idToFollow = button.message.embeds?.[0].footer.text;

      console.log('FOLLOW THIS BISH:', idToFollow);

      await button.message.edit(button.message.content, {
        component: null,
        embed: button.message.embeds?.[0],
      });
    });
  },
  async run(bot, message, ctx) {
    const target =
      (await findPerson(ctx.args.target ?? message.author)) ??
      message.mentions.members.first();

    if (!target) {
      this.send('Who?');
      return;
    }

    const profile = await bot.getProfile(target.id);

    const embed = new MessageEmbed({
      title: target.username,
      thumbnail: {
        url: target.user.avatarURL(),
      },
      footer: {
        text: target.id,
      },
      fields: [{ name: 'Flowers', value: profile.flower.count }],
    });

    const followButton = new MessageButton()
      .setStyle('blurple')
      .setLabel('Follow')
      .setEmoji('👤')
      .setID(`follow_button`);

    this.send({
      embed,
      button: followButton,
    });
    //const target = await findPerson(message.mentions.members.first()); ((╯°□°）╯︵ ┻━┻
  },
});
