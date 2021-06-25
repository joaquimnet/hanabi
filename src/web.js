const logger = require('./modules/logger');

let bot;

const fastify = require('fastify').default({
  logger: false,
});

fastify.get('/', function (request, reply) {
  reply.send({ hanabi: process.env.npm_package_version });
});

fastify.post('/vote', (req, res) => {
  // TODO: Move this secret to the environment, ofc.
  if (req.headers.authorization !== 'super secret') {
    return res.status(401).send({ error: 'unauthorized' });
  }
  bot.emit('vote', req.body);
});

fastify.get('/bot/counts', (req, res) => {
  // TODO: Move this secret to the environment, ofc.
  if (req.headers.authorization !== 'super secret') {
    return res.status(401).send({ error: 'unauthorized' });
  }
  const counts = {
    listeners: bot.botListeners.size,
    tasks: bot.schedule.tasks.length,
    guilds: bot.guilds.cache.size,
    users: bot.guilds.cache
      .filter((u) => !u.bot)
      .reduce((acc, guild) => acc + guild.memberCount, 0),
  };

  if (req.query.omitHidden) {
    counts.commands = bot.commands.filter((c) => !c.hidden).size;
  } else {
    counts.commands = bot.commands.size;
  }

  res.send(counts);
});

const run = (client) => {
  bot = client;
  fastify.listen(process.env.PORT, '::', function (err, address) {
    if (err) {
      logger.error(err);
      process.exit(1);
    }
    logger.info(`Web server listening on port ${address}`);
  });
  return fastify;
};

module.exports = run;
