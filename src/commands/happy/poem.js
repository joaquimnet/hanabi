const { Command } = require('@ponatech/bot');

const getRandomPoem = (format) => {
  const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const poems = [
    format(
        ':white_flower:You are filled with doubt', 
        'of the magic inside you,', 
        'but its all I see.:white_flower:'),
    format(
      ':white_flower:Ah, ah cries the crow arching toward the heavy sky over the marina.',
      'Lands on the crown of the palm tree.',
      'Ah, ah slaps the urgent cove of ocean swimming through the slips.',
      'We carry canoes to the edge of the salt.',
      'Ah, ah groans the crew with the weight, the winds cutting skin',
      'We claim our seats. Pelicans perch the draft for fish.',
      'Ah, ah beats our lungs and we are racing into the waves.',
      'Though there are worlds below us and above us, we are straight ahead.',
      'Ah, ah tattoos the engines of your plane against the sky--away from these waters.',
      'Each paddle stroke follows the curve from reach to loss.',
      'Ah, ah calls the sun from a fishing boat with a pale, yellow sail. We fly by',
      'on our return, over the net of eternity thrown out for stars.',
      '\n',
      'Ah, ah scapes the hull of my soul. Ah, ah.:white_flower:',
    ),
    format(
      ":white_flower:Sometimes things don't go, after all, from bad to worse. Some years, muscadel",
      "faces down frost; green thrives; the crops don't fail,",
      'sometimes a man aims high, and all goes well.',
      '\n',
      'A people sometimes will step back from war; elect an honest man, decide they care',
      "enough, that they can't leave some stranger poor.",
      'Some men become what they were born for.',
      '\n',
      'Sometimes our best efforts do not go amiss, sometimes we do as meant to.',
      'The sun will sometimes melt a field of sorrow that may seemed hard frozen:',
      'may it happen for you,:white_flower:',
    ),
    format(
      ':white_flower:I kind of exploded inside',
      'and joy shot out of me.',
      'I began my roll down the grassy hill.',
      'I bent my knees up so small, took a deep breath and I was off.',
      'My arms shot out sideways.',
      'I gathered speed.',
      'Sky and grass, dazzle and dark.',
      'I went on forever,',
      'My arms were covered with dents, holes, squashed grass.',
      'Before I knew it, I was at the bottom.',
      'The game was over.',
      'The door of the classroom closed behind me.',
      'I can smell chalk dust, and hear the voice of teachers,',
      'to make me forget my hill.:white_flower:',
    ),
    format(
      ':cat:Cats',
      'have eyes that yawn,',
      'green',
      'as a halt sign.',
      '\n',
      'In morse-tail',
      'language',
      'they speak your mind',
      '\n',
      'loving you',
      'to furr-deep',
      '*distraction*:cat:',
    ),
    format(
      ':white_flower:Are you okay?',
      'Are you alright, are you fine, are you good?',
      'Are you adequate, are you decent?',
      'Are you emotionally stable, sleeping without crying, smiling because you want to?',
      'Are you breathing without questioning, are you waking up without trying, are you eating without throwing up?',
      'Are you reading this poem right now and thinking no?',
      'Are you thinking for the first time, will I ever be okay?',
      '\n',
      'You will be okay.',
      'You will be alright, you will be fine, you will be good.',
      'You will be adequate, you will be decent.',
      'You will be emotionally stable, you will sleep without crying, and smile for the happiness blooming inside of you.',
      'You will breathe without questioning, you will wake up to a new day, you will eat easily.',
      'You',
      'are going to be okay.',
      'So please smile sunshine',
      "It's a fine new day",
      'to be okay :orange_heart::white_flower:',
    ),
    format(
      ':white_flower:Let the sunshine in, let the sunshine in;',
      'Open up your hearts and let the sunshine in.',
      '\n',
      'I got a friend in you; you got a friend in me.',
      'Just smile that way each and every day,',
      'fill the world with love and say!',
      '\n',
      'Let the sunshine in, let the sunshine in;',
      'Open up your hearts and let the sunshine in.',
      '\n',
      'Kindness is the key to peace and harmony!',
      'Open up your hearts and let the sunshine in.',
      '\n',
      'Let the sunshine in, let the sunshine in;',
      'Open up your hearts and let the sunshine in.',
      '~',
      'Let the sunshine in;',
      'let the sunshine in,',
      'Open up your hearts and let the sunshine in.:white_flower:',
    ),
    format(
        ':white_flower:Your smile is a million suns', 
        'The galaxy never knows night', 
        "When you're happy.:white_flower:"),
    format(
      ':white_flower:Happiness,:white_flower:',
      '\n:white_flower::white_flower::white_flower:',
      'can not be found in the flesh,',
      'For as warm as it may be',
      'As soft as your fingers it is',
      'It will lay soft and cold eventually',
      '\n:white_flower::white_flower::white_flower:',
      'can not be found in gold',
      'Yes, it never loses its luster',
      'But many coins you need to muster',
      'And no number will fill the gap in your soul',
      '\n:white_flower::white_flower::white_flower:',
      'can not be found in others',
      'For the laughs may distract',
      'The facede will crack',
      'And still you will be empty inside',
      '\n:white_flower::white_flower::white_flower:',
      'ilusive as it may be',
      'It follows you around',
      'It never left',
      'For within you she rest',
      'Waiting to be awoken',
      'And while the rest might feel great',
      'They serve as nothing but crutches',
      'On your own you must stand',
      'If you are to revel',
      'On the pleasures life offers...',
      '\n:white_flower::white_flower::white_flower:',
      'To improve one self',
      'To look on path troded',
      "It's essence",
      '\n:white_flower::white_flower::white_flower:',
      'To know there is more',
      'With hunger jump forth',
      "It's rushes",
      '\n:white_flower::white_flower::white_flower:',
      'To balance the mind',
      'With the desire of the heart',
      "It's key",
      '\n:white_flower::white_flower::white_flower:',
      'And once held in hand',
      'You will understand',
      'That happiness flies like a bird',
      'But behind she left',
      '*Tranquility*',
      'And the knowledge',
      'That you can get it again...',
    ),
    format(
      ':white_flower:Life and love and death and birth',
      'And peace',
      'And love',
      'On the planet earth',
      "    Is there anything that's worth",
      'More than',
      'Peace',
      'And love',
      'On the planet earth?:white_flower:',
    ),
    format(
      ':white_flower:You told me that you have',
      'Over one million hair follicles',
      'And I believe you.',
      'I do.',
      "But, if it's okay, I've never counted",
      'To one million before.',
      'I heard it takes a really long time,',
      'But after I count all of the spots',
      'The hair grows out of you,',
      'I want to count all your freckles',
      'And connect them like constellations.',
      "You're just like the universe to me",
      'And each freckle is a star.',
      "There are lots of stars we can't",
      'See with the naked eye,',
      'But want to find those too.',
      'If that’s okay.:white_flower:',
    ),
    format(
        ':white_flower:What a joy it is', 
        'to know that for once in some time', 
        'life will really be okay.:white_flower:'),
    format(
      ':white_flower:My home is where I can find my heart',
      "It's where I can express my art",
      'Where I can bury all my worries',
      'And where I can seek my peace',
      '\n',
      'My home is full of morning laughter',
      'Cherish talks and smiles from each other',
      'We will be living here together',
      'Inside my home forever.:white_flower:',
    ),
  ];
  return random(poems);
};

module.exports = new Command({
  name: 'poem',
  description: 'One of the many things that make me happy!',
  category: 'happy',
  usage: '[fast]',
  async run(bot, message, meta) {
    const { args } = meta;
    if (!(args && args[0] === 'fast')) {
      message.channel.startTyping().catch(() => {});
      await bot.wait(2000);
    }
    // roses are red, violets are blue, you're cute, and hanabi is too
    // roses are red, violets are blue, you're cute, and hanabi is too
    // roses are red, violets are blue, you're cute, and hanabi is too
    // roses are red, violets are blue, you're cute, and hanabi is too
    // roses are red, violets are blue, you're cute, and hanabi is too
    // roses are red, violets are blue, you're cute, and hanabi is too
    // roses are red, violets are blue, you're cute, and hanabi is too
    // roses are red, violets are blue, you're cute, and hanabi is too
    // roses are red, violets are blue, you're cute, and hanabi is too
    // roses are red, violets are blue, you're cute, and hanabi is too
    // roses are red, violets are blue, you're cute, and hanabi is too
    // roses are red, violets are blue, you're cute, and hanabi is too
    this.send(getRandomPoem(bot.lines))
      .then(() => message.channel.stopTyping())
      .catch(() => {});
  },
});

// Looks good👍 :thumbs_up:

// : 'roses are red\n violets are blue\n i asked who joe is\n and got destroyed by blu
// 👍