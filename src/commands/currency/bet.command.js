/* eslint-disable no-unreachable */
const { Command, TextHelpers } = require('sensum');
const { MessageActionRow, MessageButton } = require('discord-buttons');
const Time = require('../../services/time.service');

const description = TextHelpers.lines(
  'Welcome to the Flower Casino!',
  "Bet your monies and try to get more monies. It's easy like that.",
  '',
  'You can only bet once an hour, choose wisely.',
  '',
  "**BY THE WAY:** There is a chance for you to hit the jackpot and win 20x the reward (if you're lucky).",
  '',
  'Tip: You can use the **~remind** if you have goldfish memory like me. 🐟',
);

const BET_AMOUNTS = {
  BET_10: 10,
  BET_50: 50,
  BET_100: 100,
  BET_500: 500,
  BET_1000: 1000,
};

const BET_MESSAGES = {
  BET_RULES: TextHelpers.lines('Bet your money, get money. No refunds.'),
  BET_HISTORY: TextHelpers.lines('[Soon™]'),
  BET_STATS: TextHelpers.lines('[Soon™]'),
};

const PHRASES = [
  'Flowers offered on all ceremonial occasions, and placed as offerings before the gods, should not be offered loosely, but should represent time and thought.',
  'Consideration of the vase as being something more than a mere holder of the flowers is an important consideration.',
  'It is the human soul that is purged of its excessive passions.',
  'To raise the question is to see the irrelevance of this distinction.',
  'That which it is the renunciation, rejection and, ultimately, the death of the need to hold on to a separate, self-centered existence.',
  'There are no visions, no sense of self, no thoughts. There are only pure awareness and ecstatic freedom.',
  "If you can't change your fate, change your attitude.",
  'Small goals are more important than big goals. Moving forward in steps is easier than trying to take leaps.',
  "Today i'm gonna figure out how to do this better.",
  'Do new things, do things you could not do in the past',
  "In three words I can sum up everything I've learned about life: it goes on.",
  'A friend is someone who knows all about you and still loves you.',
  'Live as if you were to die tomorrow. Learn as if you were to live forever.',
  'Life is an extant form of existence.',
  'Dread it Run from it Destiny Arrives all the same.',
  'Tis a free and connected world, seek thee knowledge and thou shall find thy answers.',
  "Purple doesn't exist.",
  "I'm as sharp as a ping pong ball.",
];

const jackpots = new Map();

module.exports = new Command({
  name: 'bet',
  description: 'Bet monies to get monies. Easy like that!',
  category: 'currency',
  aliases: ['gamble'],
  init(bot) {
    Object.keys(BET_AMOUNTS).forEach((betAmountType) => {
      bot.buttons.set(betAmountType, async (button) => {
        await button.clicker.fetch();
        const profile = await getProfile(bot, button.clicker.user.id);
        if (!profile) {
          return;
        }
        const timeToNext = Time.moment(profile.bets.time)
          .startOf('hour')
          .add(1, 'hour');
        const canBetAgain = Time.moment().isAfter(timeToNext);

        if (!canBetAgain) {
          await button.message.channel.send(
            `${button.clicker.user.username}, you can only bet once an hour. :c\n` +
              `You'll be able to bet again **${Time.fromNow(
                Math.abs(Time.moment().diff(timeToNext) / 1000),
              )}**`,
          );
          await button.reply.defer().catch(() => {});
          return;
        }
        await button.reply.send({
          embed: {
            title: `You're betting ¥${BET_AMOUNTS[betAmountType]}`,
            description: bot.lines(
              PHRASES[Math.floor(Math.random() * PHRASES.length)],
              '',
              'What will you choose?',
            ),
            color: bot.colorInt('#f0b7d3'),
            thumbnail: {
              url: 'https://i.imgur.com/3y7lKq8.png',
            },
          },
          component: new MessageActionRow().addComponents([
            new MessageButton()
              .setStyle('blurple')
              .setEmoji('💮')
              .setID('FINISH1_' + betAmountType),
            new MessageButton()
              .setStyle('blurple')
              .setEmoji('🎆')
              .setID('FINISH2_' + betAmountType),
            new MessageButton()
              .setStyle('blurple')
              .setEmoji('⏱️')
              .setID('FINISH3_' + betAmountType),
          ]),
        });
      });
    });

    Object.keys(BET_AMOUNTS).forEach((betAmountType, i) => {
      for (let i = 1; i <= 3; i++) {
        bot.buttons.set(`FINISH${i}_` + betAmountType, async (button) => {
          await button.clicker.fetch();
          const profile = await getProfile(bot, button.clicker.user.id);
          if (!profile) {
            return;
          }
          const timeToNext = Time.moment(profile.bets.time)
            .startOf('hour')
            .add(1, 'hour');
          const canBetAgain = Time.moment().isAfter(timeToNext);

          if (!canBetAgain) {
            await button.message.channel.send(
              `${button.clicker.user.username}, you can only bet once an hour. :c\n` +
                `You'll be able to bet again **${Time.fromNow(
                  Math.abs(Time.moment().diff(timeToNext) / 1000),
                )}**`,
            );
            await button.reply.defer().catch(() => {});
            return;
          }

          const betAmount = BET_AMOUNTS[betAmountType];

          const jackpotRoll = Math.random() + Math.random();
          const roll = Math.random() - i / 20;

          const giveReward = roll >= 0.3;
          const giveJackpot = jackpotRoll >= 1.6;

          const reward = betAmount + Math.floor((2 - roll) * 20 * (i + 1));
          const jackpotReward = Math.floor(
            (2 - roll) * 20 * (i + 1) * 69 * 0.8,
          );

          if (giveJackpot) {
            const msg = await button.message.channel.send({
              embed: {
                title: 'YOU HIT THE JACKPOT!',
                author: {
                  name: button.clicker.user.tag,
                  iconURL: button.clicker.user.avatarURL(),
                },
                description: `Congratulations, ${button.clicker.user.tag}! You hit the jackpot, so lucky!`,
                fields: [
                  { name: 'You Bet', value: `¥${betAmount}`, inline: true },
                  {
                    name: 'Your Prize',
                    value: `¥${jackpotReward}`,
                    inline: true,
                  },
                ],
                thumbnail: {
                  url: 'https://i.imgur.com/3y7lKq8.png',
                },
                image: {
                  url: 'https://media1.tenor.com/images/7b2c11edf651bb1329f4555642545d00/tenor.gif?itemid=11773610',
                },
                color: bot.colorInt('#debd18'),
              },
              component: new MessageButton()
                .setStyle('green')
                .setEmoji('👋')
                .setLabel('YOINK')
                .setID('JACKPOT_YOINK'),
            });
            await giveMoney(bot, button.clicker.user.id, jackpotReward);
            jackpots.set(msg.id, button.clicker.user.id);
          }
          await button.reply.defer().catch(() => {});
          await button.message.delete().catch(() => {});
          if (giveReward) {
            await button.message.channel.send(
              `🎇 Wooooooo! You won **¥${reward}**!`,
            );
            await giveMoney(bot, button.clicker.user.id, reward);
          } else {
            await giveMoney(bot, button.clicker.user.id, -betAmount);
            await button.message.channel.send(
              "You didn't win anything this time, maybe try again...? ;-;",
            );
          }
          profile.bets.time = new Date();
          await profile.save();
          // TODO: Add generic metric.
        });
      }
    });

    Object.keys(BET_MESSAGES).forEach((messageType) => {
      bot.buttons.set(messageType, async (button) => {
        await button.clicker.fetch();

        await button.reply.send({
          ephemeral: true,
          embed: {
            description: BET_MESSAGES[messageType],
            author: {
              name: button.clicker.nickname ?? button.clicker.user.tag,
              iconURL: button.clicker.user.avatarURL(),
            },
            thumbnail: {
              url: 'https://i.imgur.com/3y7lKq8.png',
            },
            color: bot.colorInt('#f0b7d3'),
          },
        });
      });
    });

    bot.buttons.set('JACKPOT_YOINK', async (button) => {
      await button.clicker.fetch();

      if (jackpots.get(button.message.id) === button.clicker.user.id) {
        await button.reply.send("You can't yoink on your own jackpot!", true);
        return;
      }

      await button.message
        .edit(button.message.content, {
          component: null,
          embed: button.message.embeds?.[0],
        })
        .catch(() => {});

      await button.message.channel
        .send(
          `✨ Niiiice! **${button.clicker.user.tag}** you yoinked **¥100** from that jackpot! :3`,
        )
        .catch(() => {});

      jackpots.delete(button.message.id);
      await giveMoney(bot, button.clicker.user.id, 100);
      await button.reply.defer();
    });
  },
  run(bot, message, ctx) {
    // this.send('Bet machine broke, trying to fix it... :sob:');
    // return;
    const buttonRow1 = [
      { emoji: '🪙', label: 'Bet ¥10', id: 'BET_10' },
      { emoji: '💵', label: 'Bet ¥50', id: 'BET_50' },
      { emoji: '🤑', label: 'Bet ¥100', id: 'BET_100' },
      { emoji: '💰', label: 'Bet ¥500', id: 'BET_500' },
      { emoji: '💸', label: 'Bet ¥1000', id: 'BET_1000' },
    ].map(({ emoji, label, id }) =>
      new MessageButton()
        .setEmoji(emoji)
        .setID(id)
        .setLabel(label)
        .setStyle('blurple'),
    );
    // const buttonRow2 = [
    //   { emoji: '📃', label: 'See Rules', id: 'BET_RULES' },
    //   { emoji: '📄', label: 'See My History', id: 'BET_HISTORY' },
    //   { emoji: '🥇', label: 'See My Stats', id: 'BET_STATS' },
    // ].map(({ emoji, label, id }) =>
    //   new MessageButton()
    //     .setEmoji(emoji)
    //     .setID(id)
    //     .setLabel(label)
    //     .setStyle('gray'),
    // );

    this.send({
      embed: {
        title: 'Flower Casino',
        description,
        thumbnail: {
          url: 'https://i.imgur.com/3y7lKq8.png',
        },
        color: bot.colorInt('#f0b7d3'),
      },
      components: [
        new MessageActionRow().addComponents(buttonRow1),
        // new MessageActionRow().addComponents(buttonRow2),
      ],
    });
  },
});

async function giveMoney(bot, userId, amount) {
  const profile = await bot.getProfile(userId).catch(() => {});
  if (profile) {
    await profile.giveMoney(bot, amount).catch(() => {});
  }
}

function getProfile(bot, userId) {
  return bot.getProfile(userId).catch(() => {});
}
