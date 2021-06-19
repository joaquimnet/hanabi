const { Command } = require('sensum');

const itsNotBlu = require('../../util/bluOnly');

module.exports = new Command({
  name: 'gtg',
  aliases: ['gottablast'],
  description: 'for when u gotta go duh',
  category: 'other',
  delete: true,
  hidden: true,
  run(bot, message, meta) {
    if (itsNotBlu(meta.client, message)) return;
    meta.respond("baby blu has said 'Gotta Blast!':rocket: ");
  },
});
