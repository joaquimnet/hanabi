const logger = require('./modules/logger');
const CommandUsageMetricV1Model = require('./metrics/commands/command-usage-metric.v1.model');
const ListenerUsageMetricV1Model = require('./metrics/listeners/listener-usage-metric.v1.model');
const Reporter = require('./metrics/reports/reporter');

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
  res.status(200).send({ message: 'Done!' });
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

fastify.get('/bot/usage', async (req, res) => {
  // TODO: Move this secret to the environment, ofc.
  if (req.headers.authorization !== 'super secret') {
    return res.status(401).send({ error: 'unauthorized' });
  }

  const reporter = new Reporter([
    CommandUsageMetricV1Model,
    ListenerUsageMetricV1Model,
  ]);
  const [commandAggregation, listenerAggregation] =
    await reporter.countTotalEvents('month');

  res.send({
    commands: commandAggregation.count,
    listeners: listenerAggregation.count,
  });
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
