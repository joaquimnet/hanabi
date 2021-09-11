const Reporter = require('./reporter');
const CommandUsageMetricV1 = require('../commands/command-usage-metric.v1.model');
const ListenerUsageMetricV1 = require('../listeners/listener-usage-metric.v1.model');

class GuildReporter extends Reporter {
  constructor() {
    super([CommandUsageMetricV1, ListenerUsageMetricV1]);
  }

  getDaily() {
    return this._getStatistics('guildId', 'day');
  }

  getWeekly() {
    return this._getStatistics('guildId', 'week');
  }

  getMonthly() {
    return this._getStatistics('guildId', 'month');
  }

  getYearly() {
    return this._getStatistics('guildId', 'year');
  }

  getByDate(date) {
    return this._getStatistics('guildId', date);
  }
}

const guildReporter = new GuildReporter();

module.exports = guildReporter;
