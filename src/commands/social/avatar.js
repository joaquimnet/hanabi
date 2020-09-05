const { Command } = require('@ponatech/bot');
const { MessageEmbed } = require('discord.js');

function makeEmbed(text, image, message) {
  const embedData = {
    author: {
      name: message.author.username,
      iconURL: message.author.avatarURL(),
    },
    footer: {
      text: '<3',
      icon_url: message.client.user.avatarURL(),
    },
    description: text,
  };

  const embed = new MessageEmbed(embedData);
  embed.setImage(image);

  return embed;
}

module.exports = new Command({
  name: 'avatar',
  description: "Displays someone's avatar.",
  category: 'social',
  args: ['target'],
  usage: '{@Name}',
  examples: ['@blu'],
  run(bot, message) {
    const target = message.mentions.members.first();
    if (!target) {
      this.send("I couldn't find that person.");
      return;
    }

    this.send({
      embed: makeEmbed(
        target.user.tag + "'s Avatar",
        target.user.displayAvatarURL({ size: 512 }),
        message,
      ),
    });
  },
});
