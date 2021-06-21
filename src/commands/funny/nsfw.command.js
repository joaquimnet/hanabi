const { Command } = require('sensum');
const Booru = require('booru');
const Prompter = require('chop-prompter');
const got = require('got');
const fs = require('fs/promises');

module.exports = new Command({
  name: 'nsfw',
  description: 'Searches for lewd pictures... >///<',
  aliases: ['lewd', 'lewds'],
  cooldown: 5,
  category: 'funny',
  args: {
    tags: 'string',
  },
  usage: '{tags}',
  examples: ['neko', 'blonde'],
  async run(bot, message, meta) {
    if (!message.channel.nsfw) {
      this.send(
        `:knife:You're treading on thin ice... This is NOT that kind of channel >:c :gun:`,
      );
      return;
    }
    if ((meta.cliArgs._[0] ?? '').match(/hanabi/gi)) {
      this.send(`:knife:Once again... I am not legal. :gun:`);
      return;
    }
    await this.send(`Searching for: ${meta.cliArgs._[0] ?? 'swimsuit'}...`);
    try {
      const posts = await Booru.search(
        'danbooru',
        meta.cliArgs._[0] ?? 'swimsuit',
        {
          limit: 1,
          random: true,
          nsfw: true,
        },
      );
      for (let post of posts) {
        this.send(post.fileUrl);
        const response = await Prompter.confirm({
          channel: message.channel,
          question: "Save this image to Kaffe's compooter?",
        });
        if (response) {
          saveImage(post.fileUrl, meta);
        }
      }
    } catch (err) {
      this.send('Oh no... something went wrong. >n<');
      bot.logger.error(err);
    }
  },
});

async function saveImage(url, meta) {
  let res;
  try {
    res = await got(url, { responseType: 'buffer' });
  } catch {
    this.send("That's not a valid image...");
    return;
  }
  if (!res.headers['content-type']?.startsWith('image')) {
    this.send("Looks like that's not an image...");
    return;
  }

  await fs.mkdir('./downloaded-images').catch(() => {});
  fs.writeFile(`./downloaded-images/${Date.now()}.png`, res.body);
}
