const { Command } = require('@ponatech/bot');

module.exports = new Command({
  name: 'invite',
  description: 'Generates an invite for Hanabi.',
  aliases: ['inviteme'],
  category: 'other',
  hidden: false,
  async run() {
    const invite = `https://discordapp.com/api/oauth2/authorize?client_id=${process.env.CLIENT_ID}&permissions=392256&scope=bot`
    this.send('I\'m so happy you want to invite me c:' , invite);
  },
});