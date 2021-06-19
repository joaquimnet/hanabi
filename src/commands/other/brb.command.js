const { Command } = require('sensum');

const itsNotBlu = require('../../util/bluOnly');

module.exports = new Command({
  name: 'brb',
  aliases: [],
  description: 'for when u gotta brb duh',
  category: 'other',
  delete: true,
  hidden: true,
  run(bot, message, meta) {
    if (itsNotBlu(bot, message, meta)) return;
    meta.respond("baby blu has said 'brb, gotta wizz' 🚽");
  },
});
