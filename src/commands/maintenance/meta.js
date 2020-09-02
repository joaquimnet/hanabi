const { Command, Permission } = require('@ponatech/bot');
const { logger } = require('../../modules');

module.exports = new Command({
  name: 'meta',
  description: 'Logs the contents of the meta.',
  permission: Permission.BOT_ADMIN,
  category: 'maintenance',
  run(bot, message, meta) {
    logger.log(meta);
    this.send('Done!');
  },
});
// potato 🍟potato
// potato🍠potato