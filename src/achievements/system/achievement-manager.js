const { FileLoader } = require('sensum');
const { Collection } = require('discord.js');

const { Achievement } = require('./achievement');

class AchievementManager {
  constructor(bot) {
    this.bot = bot;
    this.cache = new Collection();
    this.loadAchievements(bot);
  }

  async loadAchievements(bot) {
    const files = await FileLoader.readAllFiles({ root: bot.config.root });
    const { achievements } = await FileLoader.requireSensumObjects(
      bot.config.root,
      files,
      [
        {
          importClass: Achievement,
          name: 'achievements',
          regex: /\.achievement\.js$/,
        },
      ],
    );

    const achievementHashmap = {};
    for (const a of achievements) {
      if (achievementHashmap[a.flag]) {
        achievementHashmap[a.flag] += 1;
      } else {
        achievementHashmap[a.flag] = 1;
      }
    }

    const repeated = [];

    for (const [achievement, count] of Object.entries(achievementHashmap)) {
      if (count > 1) {
        repeated.push(achievement);
      }
    }

    if (repeated.length > 0) {
      throw new Error(
        `The following achievements have been registered more than once: ${repeated.join(
          ', ',
        )}.`,
      );
    }

    this.cache = new Collection(achievements.map((a) => [a.flag, a]));
  }

  async progress({ achievementGroup, progressAmount, profile, channel }) {
    const achievements = this.cache.filter((a) => a.group === achievementGroup);

    if (!achievements.size) {
      this.bot.emit(
        'warn',
        `Tried adding achievement progress to group ${achievementGroup} but no achievements were found.`,
      );
      return;
    }

    const notAchieved = achievements
      .filter(
        (a) => !profile.achievements.some((pa) => pa.achievement === a.flag),
      )
      .array();

    for (const achievement of notAchieved) {
      profile.achievements.push({
        _id: achievement.flag,
        achievement: achievement.flag,
        achievementGroup: achievement.group.flag,
      });
    }

    const alreadyAchieved = profile.achievements
      .filter((ap) => ap.completedAt)
      .map((ap) => ap.achievement);

    for (const achievement of profile.achievements) {
      if (
        achievement.achievementGroup === achievementGroup.flag &&
        !alreadyAchieved.includes(achievement.achievement)
      ) {
        achievement.progress += progressAmount;
      }
    }

    await profile.save();

    await this._tryAward(
      achievements.array(),
      progressAmount,
      profile,
      channel,
    );
  }

  async _tryAward(achievements, progressAmount, profile, channel) {
    const achieved = profile.achievements
      .filter((a) => a.completedAt)
      .map((a) => a.achievement);

    const achievementsToProgress = achievements.filter(
      (a) => !achieved.includes(a.flag),
    );

    const evaluations = achievementsToProgress.map((a) => {
      try {
        const promise = a.evaluate(this.bot, profile, progressAmount);
        if (!(promise instanceof Promise)) {
          this.bot.emit(
            'error',
            new Error(
              `The evaluate function for the ${a.flag} achievement did not return a promise.`,
            ),
          );
          return Promise.resolve(false);
        }
        return promise
          .then((res) => ({ result: res, achievement: a }))
          .catch((err) => {
            this.bot.emit('error', err);
            return false;
          });
      } catch (err) {
        this.bot.emit('error', err);
        return Promise.resolve(false);
      }
    });

    const results = await Promise.all(evaluations);
    results.forEach((res) => {
      if (res.result === true) {
        this.bot.emit('achievement', {
          profile,
          achievement: res.achievement,
          channel,
        });
      }
    });
  }
}

module.exports = AchievementManager;
