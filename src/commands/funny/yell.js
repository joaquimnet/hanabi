const { Command } = require('@ponatech/bot');

const letter = (l) => `:regional_indicator_${l}:`;
// how tf you do that. that's wild

// I'm a coding wizard 🔍
const LETTERS = {
  a: letter('a'),
  b: letter('b'),
  c: letter('c'),
  d: letter('d'),
  e: letter('e'),
  f: letter('f'),
  g: letter('g'),
  h: letter('h'),
  i: letter('i'),
  j: letter('j'),
  k: letter('k'),
  l: letter('l'),
  m: letter('m'),
  n: letter('n'),
  o: letter('o'),
  p: letter('p'),
  q: letter('q'),
  r: letter('r'),
  s: letter('s'),
  t: letter('t'),
  u: letter('u'),
  v: letter('v'),
  w: letter('w'),
  x: letter('x'),
  y: letter('y'),
  z: letter('z'),
  0: '0⃣',
  1: '1⃣',
  2: '2⃣',
  3: '3⃣',
  4: '4⃣',
  5: '5⃣',
  6: '6⃣',
  7: '7⃣',
  8: '8⃣',
  9: '9⃣',
  10: '🔟',
  '#': '#⃣',
  '*': '*⃣',
  '!': ':heart_exclamation:',
  '.': ':radio_button:',
  '?': ':grey_question:',
};

const userRegex = /(?<=<@)[!]{0,1}(\d+?)(?=>)/g;
const channelRegex = /(?<=<#)(\d+?)(?=>)/g;

module.exports = new Command({
  name: 'yell',
  description: "Get your point across, I'll yell for you :white_flower:",
  category: 'funny',
  aliases: ['scream', 'shout'],
  delete: true,
  run(bot, message, meta) {
    const { args } = meta;
    if (!args[0]) return;
    const content =
      '' +
      message.content
        .substr(message.content.indexOf(args[0]))
        .toLowerCase()
        .replace(channelRegex, (id) => {
          const channel = message.guild.channels.get(id);
          return channel.name.toLowerCase();
        })
        .replace(userRegex, (id) => {
          id = id.replace('!', '');
          const member = message.guild.members.get(id);
          return (member.nickname || member.user.username).toLowerCase();
        })
        .replace(/\s+/, ' ')
        // eslint-disable-next-line no-useless-escape
        .replace(/[^a-zA-Z0-9#*\s!\.\?]/g, '');

    if (content.length < 1) return;

    const theYELL = content
      .split('')
      .map((l) => LETTERS[l] || ' ')
      .join('');

    if (theYELL.length > 1999) {
      this.send('That is too long to yell. :c');
      return;
    }

    this.send(
      content
        .split('')
        .map((l) => LETTERS[l] || ' ')
        .join(''),
    );
  },
});
