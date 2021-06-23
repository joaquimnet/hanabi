const { Listener } = require('sensum');

module.exports = new Listener({
  words: ['hanani'],
  category: 'misc',
  cooldown: 10,
  priority: 0,
  maxMessageLength: 100,
  globalCooldown: 120,
  run(bot, message, meta) {
    meta.respond(
      "My name is **Hanabi**, not Hanani.... :sweat: And it's __**Hanabi-sama**__ to *you*.",
    );
    return true;
  },
});
