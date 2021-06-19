const { Command } = require('sensum');
const Anilist = require('anilist-node');
const Prompter = require('chop-prompter');
const { MessageEmbed } = require('discord.js');

const {
  getRecommendationsForAnimeList,
  getFavoriteAnimeList,
} = require('../../services');

const ani = new Anilist();

module.exports = new Command({
  name: 'anilist',
  description: "Checks someone's Anilist profile",
  category: 'funny',
  aliases: ['ani', 'anime'],
  args: {
    command: 'string',
    username: { type: 'string', optional: true },
  },
  usage: '{username|sync}',
  examples: ['xlilblu', 'Kaffe'],
  async run(bot, message, meta) {
    if (meta.args.command.toLowerCase() === 'sync') {
      let username;
      if (meta.args.username) {
        username = meta.args.username;
      } else {
        const responses = await Prompter.message({
          channel: message.channel,
          question: 'What is your Anilist username?',
          deleteMessage: false,
          limit: 1,
          userId: meta.userId,
        });
        username = responses.first().content;
      }
      const profile = await ani.user.profile(username);
      await this.send({
        embed: {
          thumbnail: { url: profile.avatar.large },
          title: profile.name,
          color: 0xffffff,
        },
      });
      const response = await Prompter.confirm({
        channel: message.channel,
        question: 'Is this you?',
        userId: meta.userId,
      });
      if (!response) {
        return this.send('Oh no! Try again then.');
      }
      meta.profile.anilistId = profile.id;
      await meta.profile.save();
      this.send('Done! You added your anilist account to your profile.');
      return;
    }
    // for recommendations
    if (meta.args.command.toLowerCase() === 'rec') {
      if (!meta.profile.anilistId) {
        return this.send(
          "You haven't synced your anilist profile yet.",
          `Use **${meta.getPrefix()}anilist sync**`,
        );
      }
      await this.send("Ok, let me see what you're into...");
      const favorites = await getFavoriteAnimeList(meta.profile.anilistId);
      await this.send(
        `I have found ${favorites.length} anime... now as for recommendations...`,
      );
      const recs = await getRecommendationsForAnimeList(favorites);

      const embed = new MessageEmbed({
        title: 'Anime Recommendations',
        description: `I found ${recs.length} recommendations, check 'em out!`,
      });

      for (const rec of recs) {
        embed.addField(
          rec.title.userPreferred,
          `:white_flower: [🎆Anilist](https://anilist.co/anime/${rec.id}):white_flower:`,
          true,
        );
      }

      this.send({ embed });
    }

    if (meta.args.command.toLowerCase() === 'list') {
      // const profile = await ani.lists.anime(meta.profile.anilistId);
      // this.send(JSON.stringify(profile, null, 2), { split: true });
      // message.channel.send({
      //   files: [
      //     {
      //       attachment: Buffer.from(JSON.stringify(profile, null, 2)),
      //       name: 'list.json',
      //     },
      //   ],
      // });
      return this.send('Soon:tm:');
    }
  },
});

// this.send('```json\n' + JSON.stringify(profile, null, 2) + '```', {
//   split: true,
// });
