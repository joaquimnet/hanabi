const { Command } = require('@ponatech/bot');

module.exports = new Command({
  name: 'settings',
  description: 'The settings for this server.',
  category: 'admin',
  aliases: ['config', 'configuration', 'configurate'],
  usage: '[the config option] [value]',
  examples: [' ', 'listeners'],
  admin: true,
  async run(bot, message, meta) {
    const { args } = meta;
    /*
    ______SETTINGS OPTIONS IDEAS_____
    listen -> enables/disables listeners in the current server
    prefix -> changes her prefix in the current server
    dm -> wether interactions should be sent to dm or not
    (  h e l p 🤔  )
    aw shit dont change her damn prefix >:C
    what do u need help w this all looks great??????????????????
    */

    let areListenersEnabled = meta.settings.listenerSettings.allow;

    if (args[0] && args[0].toLowerCase() === 'listeners') {
      meta.settings.listenerSettings.allow = !areListenersEnabled;
      areListenersEnabled = meta.settings.listenerSettings.allow;
      await meta.settings.save();
      meta.respond(
        `**Listeners** are now **${
          areListenersEnabled ? 'enabled' : 'disabled'
        }**.`,
      );
      if (areListenersEnabled) {
        bot.botListeners.ignored.listenGuild(meta.guild.id);
      } else {
        bot.botListeners.ignored.ignoreGuild(meta.guild.id, 0);
      }
      return;
    }

    if (args[0] && args[0].toLowerCase() === 'love') {
      meta.respond(`You silly, you can't disable the love. ;)`);
      return;
    }

    if (args[0] && args[0].toLowerCase() === 'yeehaw') {
      meta.respond(`The yeehaw aint never stoppin'! :cowboy:`);
      return;
    }

    meta.respond(
      '__**Settings For This Server**__',
      `${areListenersEnabled ? '🟢' : '🔴'} \\~~ **Listeners**`,
      '🟢 \\~~ **Love**',
      '🟢 \\~~ **Yeehaw**',
      `You can toggle them by using **${meta.getPrefix()}settings [option name]**`,
    );
  },
});
