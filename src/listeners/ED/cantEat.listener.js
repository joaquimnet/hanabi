const { Listener } = require('sensum');

module.exports = new Listener({
  words: ['(what|how|why)', '{me}', "(can't|cannot|don't)", 'eat'],
  category: 'ED',
  cooldown: 6000,
  priority: 0,
  run(bot, message, meta) {
    meta.respond(
      "__It's perfectly okay to have bad days.__ Sometimes we struggle with eating, and that's okay. When it seems impossible, remember there is a light at the end of the tunnel. Try to eat something light, and if you can't-- you can always try again later. Don't be so hard on yourself, when it feels like no one is proud of you, don't forget: **I am**. :orange_heart:",
    );
    return false;
  },
});
