const { Command } = require('@ponatech/bot');
const Anilist = require('anilist-node');
const Prompter = require('chop-prompter');
const { MessageAttachment } = require('discord.js');

const {
  getRecommendationsForAnimeList,
  getFavoriteAnimeList,
} = require('../../services');

const ani = new Anilist();

module.exports = new Command({
  name: 'anilist',
  description: "Checks someone's Anilist profile",
  category: 'funny',
  requiredArgs: ['command'],
  usage: '{username|sync}',
  examples: ['xlilblu', 'Kaffe'],
  async run(bot, message, meta) {
    if (meta.args[0].toLowerCase() === 'sync') {
      let username;
      if (meta.args[1]) {
        username = meta.args[1];
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

    if (meta.args[0].toLowerCase() === 'rec') {
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
      this.send(
        recs.reduce((acc, cur) => `${acc}\n${cur.title.romaji}`),
        { split: true },
      );
    }

    if (meta.args[0].toLowerCase() === 'list') {
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
