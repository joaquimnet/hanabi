const { Listener } = require('@ponatech/bot');

module.exports = new Listener({
  words: ['habambi'],
  category: 'misc',
  cooldown: 180000,
  priority: 0,
  run(bot, message, meta) {
    meta.respond("My name is **Hanabi**, not Habambi.... :sweat: And it's __**Hanabi-sama**__ to *you*.");
    return true;
  },
});
