const { Command } = require('sensum');
const { MessageEmbed } = require('discord.js');

module.exports = new Command({
  name: 'listeners',
  description: 'displays list of listeners currently active',
  category: 'admin',
  aliases: ['listener'],
  // args: [''],
  delete: false,
  hidden: true,
  run(bot, message, ctx) {
    const listeners = bot.botListeners;

    const listenerList = [];

    listeners.forEach((listener) => {
      if (!listenerList.includes('**' + listener.category + '**')) {
        listenerList.push(`**${listener.category}**`);
      }
      listenerList.push(`[${listener.priority}] ${listener.makeName()}`);
    });

    this.send({
      embed: new MessageEmbed({
        title: `${bot.config.name} Listeners`,
        description: bot.lines(
          '*Listeners are how I pick up on the lingo the cool kids use.',
          'It helps me feel more empathetic and authentic.',
          'I am an empathetic bot and I have tons of responses for certain topics.*',
          '',
          ...listenerList,
        ),
        image: { url: 'https://i.imgur.com/T4mB9rW.gif' },
        thumbnail: {
          url: 'https://preview.redd.it/yn5i5uy7zv601.gif?format=png8&s=649b796a8e50268c19ca548a02acc65e5a2af505',
        },
        color: bot.colorInt('#f0b7d3'),
      }),
    });
  },
});
