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
    if ((meta.cliArgs._[0] ?? '').match(/hanabi/gi)) {
      meta.respond(`:knife:Once again... I am not legal. :gun:`);
      return;
    }
    await meta.respond(`Searching for: ${meta.cliArgs._[0] ?? 'swimsuit'}...`);
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
        meta.respond(post.fileUrl);
        const response = await Prompter.confirm({
          channel: message.channel,
          question: "Save this image to Kaffe's compooter?",
        });
        if (response) {
          saveImage(post.fileUrl, meta);
        }
      }
    } catch (err) {
      meta.respond('Oh no... something went wrong. >n<');
      bot.logger.error(err);
    }
  },
});

async function saveImage(url, meta) {
  let res;
  try {
    res = await got(url, { responseType: 'buffer' });
  } catch {
    meta.respond("That's not a valid image...");
    return;
  }
  if (!res.headers['content-type']?.startsWith('image')) {
    meta.respond("Looks like that's not an image...");
    return;
  }

  await fs.mkdir('./downloaded-images').catch(() => {});
  fs.writeFile(`./downloaded-images/${Date.now()}.png`, res.body);
}
