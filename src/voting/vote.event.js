const { EventHandler } = require('sensum');

const Vote = require('./vote.model.v1');
const Alert = require('../services/alert');

module.exports = new EventHandler({
  name: 'vote',
  async run(bot, vote) {
    await Vote.addVote(vote.user, vote.type, vote.isWeekend);
    const user = await bot.users.fetch(vote.user);
    await Alert.send({
      type: Alert.types.vote,
      bot,
      message: `${user.tag} just voted for us in top.gg!!`,
      thumbnail: user.avatarURL(),
    });
  },
});
