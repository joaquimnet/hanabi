const { Command } = require('sensum');

module.exports = new Command({
  name: 'yell',
  description: "Get your point across, I'll yell for you :white_flower:",
  category: 'funny',
  aliases: ['scream', 'shout'],
  args: {
    yourMessage: 'string'
  },
  delete: true,
  run(bot, message, meta) {
    const content = clearContent(meta);
    if (content.length < 1) {
      meta.respond('That message is too short or invalid...');
      return;
    };

    const theYELL = replaceLettersWithEmotes(content);

    if (theYELL.length > 1999) {
      return meta.respond('That is too long to yell. :c');
    }

    meta.respond(theYELL);
  },
});

function clearContent(meta) {
  const userRegex = /(?<=<@)[!]{0,1}(\d+?)(?=>)/g;
  const channelRegex = /(?<=<#)(\d+?)(?=>)/g;

  return (
    meta.contentFull
      .toLowerCase()
      // remove channel ids
      .replace(channelRegex, (id) => {
        const channel = meta.message.guild.channels.get(id);
        return channel.name.toLowerCase();
      })
      // remove user ids
      .replace(userRegex, (id) => {
        id = id.replace('!', '');
        const member = meta.message.guild.members.get(id);
        return (member.nickname || member.user.username).toLowerCase();
      })
      // remove double spaces
      .replace(/\s+/, ' ')
      // eslint-disable-next-line no-useless-escape
      .replace(/[^a-zA-Z0-9#*\s!\.\?]/g, '')
  );
}

function replaceLettersWithEmotes(text) {
  // I'm a coding wizard 🔍
  const LETTERS = {
    a: '🇦​',
    b: '🇧​',
    c: '🇨​',
    d: '🇩​',
    e: '🇪​',
    f: '🇫​',
    g: '🇬​',
    h: '🇭​',
    i: '🇮​',
    j: '🇯​',
    k: '🇰​',
    l: '🇱​',
    m: '🇲​',
    n: '🇳​',
    o: '🇴​',
    p: '🇵​',
    q: '🇶​',
    r: '🇷​',
    s: '🇸​',
    t: '🇹​',
    u: '🇺​',
    v: '🇻​',
    w: '🇼​',
    x: '🇽​',
    y: '🇾​',
    z: '🇿​',
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

  return text
    .split('')
    .map((l) => LETTERS[l] || ' ')
    .join('');
}
