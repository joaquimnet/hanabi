const { Command } = require('sensum');

module.exports = new Command({
  name: 'roll',
  description: 'Rolls a die :v',
  category: 'other',
  cooldown: 0,
  args: {
    max: {
      type: 'number',
      convert: true,
      min: 1,
      max: Number.MAX_SAFE_INTEGER,
      default: 6,
    },
  },
  run(_, __, ctx) {
    const roll = getRandomNumber(ctx.args.max);

    this.send(`You rolled a ${getEmotes(roll)}`);
  },
});

function getRandomNumber(top) {
  return Math.floor(Math.random() * top) + 1;
}

function getEmotes(num) {
  const emotes = {
    0: '0️⃣',
    1: '1️⃣',
    2: '2️⃣',
    3: '3️⃣',
    4: '4️⃣',
    5: '5️⃣',
    6: '6️⃣',
    7: '7️⃣',
    8: '8️⃣',
    9: '9️⃣',
  };

  const numAsString = String(num);

  let result = '';

  for (const letter of numAsString) {
    result += emotes[letter];
  }

  return result;
}
