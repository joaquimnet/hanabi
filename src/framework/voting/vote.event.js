const { EventHandler } = require('sensum');

const Vote = require('./vote.model.v1');

const VOTE_REWARD_AMOUNT = 500;

module.exports = new EventHandler({
  name: 'vote',
  async run(bot, vote) {
    // TODO: fix duplicate key error
    await Vote.addVote(vote.user, vote.type, vote.isWeekend).catch(() => {});

    const profile = await bot.getProfile(vote.user).catch(() => {});
    if (profile) {
      await profile.giveMoney(bot, VOTE_REWARD_AMOUNT).catch(() => {});
    }

    const user = await bot.users.fetch(vote.user);
    await bot.alerts.sendSuccess({
      type: 'Hanabi got a vote!',
      message: `${user.tag} just voted for Hanabi on top.gg!!`,
      thumbnail: user.avatarURL(),
    });
  },
});
