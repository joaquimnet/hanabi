const { Task } = require('sensum');

const commandMetricQueue = require('./command-metric-queue');

module.exports = new Task({
  name: 'Save Command Metrics To Database',
  // runs every 5 minutes
  time: '0 */5 * * * *',
  run() {
    commandMetricQueue.processQueue();
  },
});
