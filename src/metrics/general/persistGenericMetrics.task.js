const { Task } = require('sensum');

const genericMetricQueue = require('./generic-metric-queue');

module.exports = new Task({
  name: 'Save Generic Metrics To Database',
  // runs every 5 minutes
  time: '0 */5 * * * *',
  run() {
    genericMetricQueue.processQueue();
  },
});
