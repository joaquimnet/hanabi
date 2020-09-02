const chalk = require('chalk');
const moment = require('moment');

const timestamp = () => `[${moment().format('YYYY-MM-DD HH:mm:ss')}]:`;

module.exports = class Logger {
  static log(...content) {
    console.log(`${timestamp()} ${chalk.bgBlue('INFO')}`, ...content);
  }

  static info(...content) {
    this.log(...content);
  }

  static warn(...content) {
    console.log(`${timestamp()} ${chalk.black.bgYellow('WARN')}`, ...content);
  }

  static error(...content) {
    console.log(`${timestamp()} ${chalk.bgRed('ERROR')}`, ...content);
  }

  static debug(...content) {
    console.log(`${timestamp()} ${chalk.green('DEBUG')}`, ...content);
  }

  static cmd(...content) {
    console.log(`${timestamp()} ${chalk.black.bgWhite('CMD')}`, ...content);
  }

  static ready(...content) {
    console.log(`${timestamp()} ${chalk.black.bgGreen('READY')}`, ...content);
  }
};
