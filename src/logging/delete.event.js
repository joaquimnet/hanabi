const { EventHandler } = require('sensum');

module.exports = new EventHandler({
  name: 'messageDelete',
  run(bot, message) {
    if (message.guild.id !== '750718685282566229') {
      return;
    }

    message.guild.channels.cache.get('858182313636134912').send({
      embed: {
        title: 'SOMETHING GOT DELETED PANIC!',
        author: {
          iconURL: message.author.avatarURL(),
        },
        description: bot.lines(
          `**Message sent by ${message.author} in ${message.channel}**`,
          '',
          message.content,
          '',
          `Author: ${message.author.id} | Message ID: ${
            message.id
          } | ${message.createdAt.toLocaleDateString()}`,
        ),
        color: bot.colorInt('#FF0000'),
      },
    });
  },
});
/* embed: [
    <@Hanabi> has just deleted >x< amount of messages <= plural (more than 1)
    if one msg : (content of message here) msg has been deleted.
--------------------------------------------------------------------------------------------------------------------------------
    99 msgs have been removed from #channel-name-here
    */
