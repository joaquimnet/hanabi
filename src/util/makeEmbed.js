const {MessageEmbed} = require('discord.js');

module.exports = function makeEmbed(text, image, message) {
  const embedData = {
    author: {
      name: message.author.username,
      iconURL: message.author.avatarURL()
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
