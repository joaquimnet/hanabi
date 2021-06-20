const { Command } = require('sensum');
// we need to get her a website entry on top.gg sir 🔫
module.exports = new Command({
  name: 'Vote',
  description: 'Vote for Hanabi and get stuff!',
  category: 'currency',
  run(bot, message, meta) {
    this.send(
      `Hello ${message.author.username}!`,
      `:yen:You currently have **${meta.profile.money}¥**!`,
      'But if you voted for me you could get ***EVEN MORE***!!!',
      'https://fakelink.fakesite/vote/hanabi'
    );
  },
});
