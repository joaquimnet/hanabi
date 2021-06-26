const Time = require('../../services/time.service');

class Reporter {
  constructor(models) {
    this._models = models;
  }

  async _getStatistics(index, timeRange, id) {
    let rangeLookup;

    if (timeRange instanceof Date) {
      rangeLookup = timeRange;
    } else {
      rangeLookup = Time.moment().startOf(timeRange).startOf('day').toDate();
    }

    const result = await Promise.all(
      this._models.map((model) =>
        model
          .aggregate([
            // Spread the individual events in the events array.
            { $unwind: '$events' },
            // Filter out events older than the specified time range.
            { $match: { 'events.time': { $gte: rangeLookup } } },
            // Group events by guild id and count them.
            { $group: { _id: `$events.${index}`, count: { $sum: 1 } } },
            // Sort by most counts in descending order.
            { $sort: { count: -1 } },
          ])
          .exec(),
      ),
    );

    return result;
  }
}

module.exports = Reporter;
