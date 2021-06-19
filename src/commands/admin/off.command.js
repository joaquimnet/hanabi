const { Command } = require('sensum');

module.exports = new Command({
  name: 'off',
  description: 'fair',
  category: 'admin',
  hidden: true,
  delete: true,
  async run(bot, message, meta) {
    meta.respond("Hi, offing my self, i'm dad.");
    await bot.wait(3000);
    meta.respond('Remember kid...');
    await bot.wait(500);
    meta.respond('Dying is GAY.');
  },
});
//dude it runs fine stop it it shouldn-- what the fuck.... i'm gay if i die?????????????? oh god dad no pls
