const { Task } = require('@ponatech/bot');

const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

module.exports = class extends Task {
  constructor() {
    // Every 20 secs
    super('Change Activity', 'repeat', '*/20 * * * * *');
  }

  async run() {
    // Possible types: PLAYING STREAMING LISTENING WATCHING
    const options = [
      'WATCHING the sunset',
      'PLAYING in a field of flowers',
      `LISTENING ${this.client.options.prefix}help`,
    ];
    const pick = () => {
      const chosen = random(options);
      return [
        chosen.split(' ').unshift(),
        chosen.split(' ').slice(1).join(' '),
      ];
    };
    try {
      this.client.user.setActivity(...pick());
    } catch {
      /* First time this runs it'll throw because bot isn't up yet */
    }
  }
};
