const { Listener } = require('sensum');

module.exports = new Listener({
  words: ['(habambi|hanani)'],
  category: 'misc',
  cooldown: 1800,
  globalCooldown: 1800,
  priority: 0,
  run(bot, message, meta) {
    meta.respond(
      "My name is **Hanabi**, not Habambi.... :sweat: And it's __**Hanabi-sama**__ to *you*.",
    );
    return true;
  },
});
