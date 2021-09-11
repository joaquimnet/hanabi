const Reporter = require('./reporter');
const CommandUsageMetricV1 = require('../commands/command-usage-metric.v1.model');
const ListenerUsageMetricV1 = require('../listeners/listener-usage-metric.v1.model');

class UserReporter extends Reporter {
  constructor() {
    super([CommandUsageMetricV1, ListenerUsageMetricV1]);
  }

  getDaily() {
    return this._getStatistics('userId', 'day');
  }

  getWeekly() {
    return this._getStatistics('userId', 'week');
  }

  getMonthly() {
    return this._getStatistics('userId', 'month');
  }

  getYearly() {
    return this._getStatistics('userId', 'year');
  }

  getByDate(date) {
    return this._getStatistics('userId', date);
  }
}

const userReporter = new UserReporter();

module.exports = userReporter;
