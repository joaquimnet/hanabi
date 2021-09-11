const m = require('moment');
const toCron = require('human-to-cron');
const toHuman = require('cronstrue').toString;
const chrono = require('chrono-node');
const parseDuration = require('parse-duration');

const moment = (...args) => m(...args).utc();

class Time {
  static parse(content) {
    let cron = null;
    let human = null;
    let relative = null;
    let duration = null;
    try {
      cron = toCron(content);
    } catch {
      /* ok */
    }
    try {
      relative = chrono.parseDate(content);
    } catch {
      /* ok */
    }
    try {
      try {
        human = toHuman(content);
      } catch {
        /* ok */
        if (cron && !content.includes('*') && cron !== '* * * * * *') {
          human = toHuman(cron);
        }
        if (!human && relative) {
          human = moment(relative).calendar();
        }
      }
    // eslint-disable-next-line no-empty
    } catch {}

    duration = parseDuration(content);

    return {
      original: content,
      cron,
      human: human ?? 'None',
      relative: moment(relative).fromNow(),
      duration,
    };
  }

  static fromNow(seconds) {
    return moment().add(seconds, 'second').fromNow();
  }

  static calendarFromNow(seconds) {
    return moment().add(seconds, 'second').calendar();
  }
}

Time.moment = moment;

module.exports = Time;
