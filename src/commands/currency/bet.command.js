const { Command } = require('sensum');
const { MessageActionRow, MessageButton } = require('discord-buttons');

const BET_AMOUNTS = {
  BET_10: 10,
  BET_50: 50,
  BET_100: 100,
  BET_500: 500,
  BET_1000: 1000,
};

const BET_MESSAGES = {
  BET_RULES: 'Bet your money, get money. No refunds.',
  BET_HISTORY: '[Soon™]',
  BET_STATS: '[Soon™]',
};

module.exports = new Command({
  name: 'bet',
  description: 'Bet monies to get monies. Easy like that!',
  category: 'currency',
  aliases: ['gamble'],
  delete: false,
  init(bot) {
    Object.keys(BET_AMOUNTS).forEach((betAmountType) => {
      bot.buttons.set(betAmountType, async (button) => {
        // console.log('button: ', button);
        await button.message.channel.send('Boop.');
        await button.defer();
      });
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
  },
  run(bot, message, ctx) {
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
    const buttonRow2 = [
      { emoji: '📃', label: 'See Rules', id: 'BET_RULES' },
      { emoji: '📄', label: 'See My History', id: 'BET_HISTORY' },
      { emoji: '🥇', label: 'See My Stats', id: 'BET_STATS' },
    ].map(({ emoji, label, id }) =>
      new MessageButton()
        .setEmoji(emoji)
        .setID(id)
        .setLabel(label)
        .setStyle('gray'),
    );

    this.send({
      embed: {
        title: 'Flower Casino',
        description: bot.lines(
          'Welcome to the Flower Casino!',
          "Bet your monies and try to get more monies. It's easy like that.",
          'You can bet [TO BE DECIDED] times per hour, choose wisely.',
          'Tip: You can use the **~remind** command to set a remind for when you next want to play. ;) [TODO: change ~ to the actual prefix]',
        ),
        thumbnail: {
          url: 'https://i.imgur.com/3y7lKq8.png',
        },
        color: bot.colorInt('#f0b7d3'),
      },
      components: [
        new MessageActionRow().addComponents(buttonRow1),
        new MessageActionRow().addComponents(buttonRow2),
      ],
    });
  },
});
