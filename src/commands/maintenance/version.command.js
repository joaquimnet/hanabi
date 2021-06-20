const { Command } = require('sensum');
const fs = require('fs');
const path = require('path');

let versionsCache;

module.exports = new Command({
  name: 'version',
  description: `Shows Hanabi's version.`,
  category: 'maintenance',
  aliases: ['ver'],
  async run(bot, message, ctx) {
    const versionFile = versionsCache
      ? versionsCache
      : JSON.parse(
          fs.readFileSync(
            path.resolve(__dirname, '../../../version.txt'),
            'utf-8',
          ),
        );
    versionsCache = versionFile;
    const { versionName, versionNumber } = versionsCache;

    this.send({
      embed: {
        title: 'Hanabi Versions',
        fields: [
          {
            name: 'Hanabi',
            value: `v${bot.version}-${versionNumber}-${versionName}`,
          },
          {
            name: 'Sensum',
            value: `v${require('sensum/package.json').version}`,
          },
          { name: 'Node', value: `${process.version}` },
        ],
        thumbnail: {
          url: bot.user.avatarURL(),
        },
        color: bot.colorInt('#f0b7d3'),
      },
    });
  },
});
