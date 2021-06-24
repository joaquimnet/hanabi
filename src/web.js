const logger = require('./modules/logger');

let bot;

const fastify = require('fastify').default({
  logger: false,
});

fastify.get('/', function (request, reply) {
  reply.send({ hanabi: process.env.npm_package_version });
});

fastify.post('/vote', (req, res) => {
  if (req.headers.authorization !== 'super secret') {
    return res.status(401).send({ error: 'unauthorized' });
  }
  bot.emit('vote', req.body);
});

const run = (client) => {
  bot = client;
  fastify.listen(process.env.PORT, function (err, address) {
    if (err) {
      logger.error(err);
      process.exit(1);
    }
    logger.info(`Web server listening on port ${address}`);
  });
  return fastify;
};

module.exports = run;
