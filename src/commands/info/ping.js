const { Command } = require('@ponatech/bot');

module.exports = new Command({
  name: 'ping',
  description: 'Pong?',
  category: 'info',
  aliases: ['ms', 'latency'],
  async run(bot, message, meta) {
    meta.respond(`Pong! ${Math.trunc(bot.ws.ping)}ms`);
  },
});
