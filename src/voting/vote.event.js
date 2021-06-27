const { EventHandler } = require('sensum');

const Vote = require('./vote.model.v1');

module.exports = new EventHandler({
  name: 'vote',
  async run(bot, vote) {
    await Vote.addVote(vote.user, vote.type, vote.isWeekend);
    const user = await bot.users.fetch(vote.user);
    await bot.alerts.sendSuccess({
      type: 'Hanabi got a vote!',
      message: `${user.tag} just voted for Hanabi on top.gg!!`,
      thumbnail: user.avatarURL(),
    });
  },
});
