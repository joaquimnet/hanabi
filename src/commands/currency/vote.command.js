const { Command } = require('sensum');
const { MessageButton } = require('discord-buttons');

// we need to get her a website entry on top.gg sir 🔫
module.exports = new Command({
  name: 'vote',
  description: 'Vote for Hanabi and get stuff!',
  category: 'currency',
  run(bot, message, meta) {
    this.send({
      embed: {
        title: 'Hanabi needs your help!',
        description: bot.lines(
          `Hello ${message.author.username}!`,
          `:yen:You currently have **${meta.profile.money}¥**!`,
          'But if you voted for me you could get ***EVEN MORE***!!!',
        ),
        color: bot.colorInt('#f0b7d3'),
        author: {
          name: 'Votey vote vote.',
          iconURL: message.author.avatarURL(),
        },
      },
      button: new MessageButton()
        .setLabel('Vote for Hanabi')
        .setStyle('url')
        .setURL('https://top.gg/bot/750693579109695638/vote'),
    });
  },
});
