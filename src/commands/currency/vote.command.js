const { Command } = require('sensum');

module.exports = new Command({
  name: 'vote',
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
