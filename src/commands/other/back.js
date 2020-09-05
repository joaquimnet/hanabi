const { Command } = require('@ponatech/bot');

const itsNotBlu = require('../../util/bluOnly');
//const { MessageAttachment } = require('discord.js');

module.exports = new Command({
  name: 'back',
  aliases: ['return'],
  description: 'for when u gotta brb duh',
  category: 'other',
  delete: true,
  hidden: true,
  run(bot, message, meta) {
    // bruh 🌸
    if (meta.caller === '517599684961894400') {
      meta.respond('Lar has returned and the kitty is OKAY :cat2:');
      return;
    }
    if (itsNotBlu(meta.client, message)) return;
    meta.respond('baby blu has returned back and better than ever :brain:');
  },
});
