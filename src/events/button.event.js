const { EventHandler } = require('sensum');

module.exports = new EventHandler({
  name: 'clickButton',
  async run(bot, button) {
    const handler = bot.buttons.get(button.id);
    if (handler) {
      handler(button);
      return;
    }
    bot.logger.warn('Unknown button clicked!', button);
    await button.reply.send(
      "Umm... That's weird. I don't remember sending that button. *@_@*",
    );
    await button.message.edit(button.message.content, {
      component: null,
      embed: button.message.embeds?.[0],
    });
  },
});
