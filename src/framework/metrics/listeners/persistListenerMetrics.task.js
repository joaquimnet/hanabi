const { Task } = require('sensum');

const listenerMetricQueue = require('./listener-metric-queue');

module.exports = new Task({
  name: 'Save Command Metrics To Database',
  // '0 */5 * * * *' -> runs every 5 minutes
  time: '0 */5 * * * *',
  run(bot) {
    bot.logger.debug('Sending listener metrics to DB.');
    listenerMetricQueue.processQueue();
  },
});
