const { Listener } = require('sensum');

module.exports = new Listener({
  words: ['{me}', 'kill(ing)*', '(you|u)'],
  category: 'misc',
  cooldown: 10,
  globalCooldown: 5400,
  priority: 0,
  run(bot, message, meta) {
    meta.respond(
      "Yeaaaaaaaaaaahhhh..... I don't think that is a good idea. Let's all take a breather now.",
      'I shall bring good food and we can all sit down and talk this out! o3o',
    );
    return true;
  },
});
