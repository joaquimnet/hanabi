const { Command } = require('@ponatech/bot');
const moment = require('moment');

const m = (t) => new moment(t || undefined).tz('America/New_York');

const timeUntilTomorrow = () =>
  m().tz('America/New_York').add(1, 'day').startOf('day').diff(m());

const timeToNextDaily = (lastDaily) => {
  const lastUsed = m(lastDaily);
  const now = m();
  if (lastUsed.isBefore(now, 'day')) {
    return 0;
  }
  return timeUntilTomorrow();
};

const formatTime = (time) => moment.duration(time).format('HH[H] mm[M] ss[S]');

module.exports = new Command({
  name: 'daily',
  description: 'Get your daily yen!',
  category: 'currency',
  aliases: ['day'],
  async run(bot, message, meta) {
    const next = timeToNextDaily(meta.profile.daily.time);
    if (next > 0) {
      this.send(
        `:timer: **|** Oh no **${
          meta.nickname ?? meta.username
        }** you have to wait **${formatTime(next)}**`,
      );
      return;
    }

    const amount = Math.min(300 + meta.profile.daily.count * 50, 2000);
    meta.respond(
      `:calendar_spiral: **| ${message.author.username}**! Here is your daily allowance! :D`,
      `:yen: **| ${amount}¥**`,
      `:newspaper: **|** By the way, you can **${meta.getPrefix()}vote** for me to get even more yen ¥ >u<`,
      `Your next daily is in **${formatTime(timeUntilTomorrow())}**`,
    );

    meta.profile.daily.time = new Date();
    meta.profile.daily.count += 1;
    meta.profile.money += amount;
    await meta.profile.save();
  },
});
