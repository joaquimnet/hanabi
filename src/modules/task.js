const nodeSchedule = require('node-schedule');

const logger = require('../modules/logger');

class Task {
  constructor({ name, time, run }) {
    if (!name) throw new Error('Missing task name.');
    if (!time) throw new Error('You must set a task time.');
    if (!run || typeof run !== 'function')
      throw new Error('You must set a run function.');

    this.name = name;
    // Cron or Date
    this.time = time;
    this.run = run;
  }

  async run() {
    /* */
  }

  toString() {
    return `${this.name} (${this.time})`;
  }
}

class Schedule {
  constructor(bot, tasks) {
    if (!bot) throw new Error('Missing client in Schedule constructor.');
    if (!tasks) throw new Error('Missing tasks in Schedule constructor.');

    this.bot = bot;
    this.tasks = tasks;
    this.tasks.forEach((t) => this.create(bot, t));
  }

  create(bot, newTask) {
    const task = newTask;

    if (!task.name) {
      bot.emit(
        'warn',
        `[Schedule] Task ${task} does not have a name. Ignoring it.`,
      );
      return;
    }
    if (!task.time) {
      bot.emit(
        'warn',
        `[Schedule] Task ${task} did not specify time. Ignoring it.`,
      );
      return;
    }

    task.job = nodeSchedule.scheduleJob(task.time, () =>
      safelyRun(() => task.run(bot), errorHandler(task)),
    );
  }
}

function safelyRun(subject, errHandler) {
  try {
    subject().catch(errHandler);
  } catch (err) {
    if (err instanceof TypeError && /catch/.test(err.message)) {
      // This error is from running .catch() on a normal function. We can ignore.
    } else {
      errHandler(err);
    }
  }
}

function errorHandler(task) {
  return function (err) {
    err.stack = (
      `An error ocurred in the ${task.name} task.\n` + err.stack
    ).replace(new RegExp(`${__dirname}/`, 'g'), './');
    logger.error(err);
  };
}

module.exports = { Schedule, Task };
