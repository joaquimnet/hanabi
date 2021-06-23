const { Command, Permission } = require('sensum');
const { MessageEmbed } = require('discord.js');
// const puppeteer = require('puppeteer');

module.exports = new Command({
  name: 'google',
  description: 'Google stuff, duh~',
  category: 'other',
  aliases: ['search'],
  args: {
    search: 'string',
  },
  usage: '[images] {your search}',
  examples: ['comedy anime', 'image red hair anime girl'],
  hidden: true,
  permission: Permission.BOT_ADMIN,
  async run(bot, message, meta) {
    if ((meta.contentFull ?? '').match(/(loli|lolis)/gi)) {
      this.send(`Not in my server, mister/miss. That is a reportable offense.`);
      return;
    }

    const google = 'https://www.google.com/search?q=';
    let search = encodeURI(meta.contentFull);

    if (['image', 'images'].includes(meta.args.search.toLowerCase())) {
      search = search.replace(/(image|images)/i, '') + '&source=lnms&tbm=isch';
    }

    const embed = new MessageEmbed({
      title: 'Search',
      description: `[${meta.contentFull}](${google + search})`,
    });

    this.send('As you so kindly requested: ', { embed });
  },
});

// async function screenshot(url) {
//   const browser = await puppeteer.launch({
//     headless: true,
//     defaultViewport: { width: 1920, height: 900 },
//     args: ['--no-sandbox'],
//   });
//   const page = await browser.newPage();
//   await page.goto(url);
//   const image = await page.screenshot();
//   // const schreen = page.screenshot({path: 'schreenshot.png'});
//   await browser.close();
//   return image;
// }
