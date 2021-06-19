const { Command } = require('sensum');
const Prompter = require('chop-prompter');
const request = require('got');

const { logger } = require('../../modules');
// this doesn't exist yet
// const listen = require('../../util/listen');

module.exports = new Command({
  name: 'joke',
  description: 'teehee~',
  category: 'funny',
  run(bot, message, meta) {
    Prompter.message({
      channel: message.channel,
      question: 'Do you want to hear a joke?',
      // prefix: 'I am',
      deleteMessage: false,
      userId: message.author.id,
    }) // okay, so removing it completely or just "//"
      .then((userResponse) => {
        // if (listen(userResponse.first(), ['{yes}'])) {
        if (userResponse.first().content.includes('yes')) {
          request('https://icanhazdadjoke.com/', {
            headers: {
              Accept: 'application/json',
              'User-Agent': 'Hanabi (https://github.com/joaquimnet/hanabi)',
            },
          }).then((jokeResponse) => {
            const { joke } = JSON.parse(jokeResponse.body);
            this.send({
              embed: {
                title: joke,
                description: ':rofl:',
                thumbnail: {
                  url: bot.user.avatarURL(),
                },
              },
            }).catch(() => {});
          }).catch(() => {
            this.send({
              embed: {
                title: 'Knock Knock. Who is there? Oh its me! Hanabi, duh! ~ ',
                description: ':rofl:',
                thumbnail: {
                  url: bot.user.avatarURL(),
                },
              },
            }).catch(() => {});
          });
        } else {
          this.send('Okay then.');
        }
      })
      .catch((err) => {
        logger.error(err);
        this.send('Okay then.');
      });
  },
});
