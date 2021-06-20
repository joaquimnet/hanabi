const { Listener } = require('sensum');
const time = require('humanize-duration');

module.exports = new Listener({
  words: ['hanabi', "(no|dont|don't)", 'listen', 'here'],
  category: 'hanabi',
  cooldown: 1,
  priority: 0,
  run(bot, message, meta) {
    const cId = message.channel.id;
    // 5 min
    const duration = 5 * 60 * 1000;
    bot.botListeners.ignored.ignoreChannel(cId, duration);
    meta.respond(
      `:c I'm sorry.... I wont look here ${
        duration ? 'for ' + time(duration) : 'anymore'
      }... :pensive:`,
    );
    bot.logger.info(
      `Ignoring channel #${message.channel.name} (${cId}) for ${time(
        duration,
      )}`,
    );
    return true;
  },
});
