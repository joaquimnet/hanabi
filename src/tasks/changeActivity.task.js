const { Task } = require('../modules');

const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

module.exports = new Task({
  name: 'Change Activity',
  // runs every 40 seconds
  time: '*/40 * * * * *',
  async run(bot) {
    // Possible types: PLAYING STREAMING LISTENING WATCHING
    const options = [
      'WATCHING the sunset',
      'WATCHING fireworks', // i...
      'WATCHING flowers grow',
      'PLAYING in a field of flowers',
      'PLAYING with sparklers', //i.......
      'PLAYING with your heart',
      `LISTENING ${bot.config.defaultSettings.prefix}help`,
      `LISTENING birds singing`,
    ];

    const pick = () => {
      const chosen = random(options);
      return [chosen.split(' ')[0], chosen.split(' ').slice(1).join(' ')];
    };

    try {
      const activity = pick();
      bot.user.setActivity(activity[1], { type: activity[0] });
    } catch {
      /* First time this runs it'll throw because bot isn't up yet */
    }
  },
});
