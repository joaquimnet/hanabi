const { Command } = require('sensum');

const icons = {
  achieved: '🔷',
  notAchieved: '▫️',
};

module.exports = new Command({
  name: 'achievements',
  description: 'Shows the achievements you have.',
  category: 'info',
  aliases: ['achiev', 'achievement'],
  args: {
    mention: { type: 'string', optional: true },
  },
  run(bot, message, ctx) {
    const achievements = bot.achievements.cache;
    const groups = bot.achievements.cache
      .map((a) => a.group)
      // Remove duplicates
      .filter((a, i, arr) => arr.indexOf(a) === i);
    const userAchievements = ctx.profile.achievements.filter(
      (a) => a.completedAt,
    );

    this.send({
      embed: {
        title: message.member?.nickname ?? message.author.username,
        thumbnail: {
          url: 'https://i.imgur.com/Jj4obT3.png',
        },
        color: bot.colorInt('#debd18'),
        fields: groups.map((group) => ({
          name: group.displayName,
          value: achievements
            .filter((achiev) => achiev.group === group)
            .map((uAchiev) =>
              userAchievements.some((uA) => uA.achievement === uAchiev.flag)
                ? icons.achieved
                : icons.notAchieved,
            )
            .join(''),
        })),
        inline: true,
      },
    });
  },
});
