const { Command } = require('@ponatech/bot');

module.exports = new Command({
  name: 'pay',
  description: 'Pays someone the specified amount of money',
  category: 'currency',
  usage: '{@mention} {amount}',
  requiredArgs: ['mention', 'amount'],
  examples: ['@Kaffe#9547 200'],
  async run(bot, message, meta) {
    const deleteIn = (msg, delay) => {
      bot.setTimeout(() => {
        msg.delete().catch(() => {});
      }, delay);
    };

    const userMention = message.mentions.users.first();
    const amount = Math.floor(Number(meta.args[1]));

    if (!userMention) {
      const msg = await this.send(
        ":no_entry_sign: You didn't tag a person to pay.",
      );
      deleteIn(msg, 4000);
      return;
    }

    if (Number.isNaN(amount) || amount < 1) {
      const msg = await this.send(
        ':no_entry_sign: That amount is not a valid number!',
      );
      deleteIn(msg, 4000);
      return;
    }

    if (meta.profile.money < amount) {
      const msg = await this.send(
        ":no_entry_sign: You don't have enough funds to do that!",
      );
      deleteIn(msg, 4000);
      return;
    }

    if (userMention === message.author) {
      const msg = await this.send(
        ':no_entry_sign: Bruh... Are you even serious?',
      );
      deleteIn(msg, 4000);
      return;
    }

    try {
      const [bal] = await meta.profile.transferMoney(
        bot,
        userMention.id,
        amount,
      );
      this.send(
        `**${message.author.username}**, you sent **${amount}¥** to **${userMention.username}**.`,
        `Your new balance is **${bal}¥**`,
      );
    } catch (err) {
      bot.logger.error(
        `Failed to transfer ${amount} currency from ${meta.tag} to ${userMention.tag}. Reason:`,
        err,
      );
      this.send('Oh no! It seems something went wrong. But you could try again later... sorry :(');
    }
  },
});
