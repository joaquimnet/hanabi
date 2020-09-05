const { Command } = require('@ponatech/bot');
const { MessageEmbed } = require('discord.js');

module.exports = new Command({
  name: 'google',
  description: 'Google stuff, duh~',
  category: 'other',
  aliases: ['search'],
  args: ['search'],
  run(bot, message, meta) {
    const google = 'https://www.google.com/search?q=';
    let search = encodeURI(meta.content);

    if (meta.args[0] === 'images') {
      search = search.replace('images', '') + '&source=lnms&tbm=isch';
    }

    const embed = new MessageEmbed({
      title: 'Search',
      description: `[${meta.content}](${google + search})`,
    });
    // console.log('https://www.google.com/search?q=' + search);
    this.send('As you so kindly requested: ', { embed });
  },
});
