const mongoose = require('mongoose');
const logger = require('./logger');

const terminate = (type, bot) => {
  const exit = (code = 0) => {
    process.exit(code);
  };

  // TODO: Send alert!

  switch (type) {
    case 'exception':
      return (err) => {
        logger.error('An uncaught exception ocurred. Terminating...');
        logger.error(err);
        bot?.destroy();
        mongoose.disconnect();
        exit(1);
      };
    case 'rejection':
      return (reason, promise) => {
        logger.error('A promise rejected without a catch. Terminating...');
        logger.error(reason);
        logger.error(promise);
        bot?.destroy();
        mongoose.disconnect();
        exit(1);
      };
    case 'db_failure':
      return (err) => {
        logger.error('Failed to connect to database. Terminating...');
        logger.error(err);
        exit(1);
      };
    default:
      return () => {
        logger.info('Received signal to terminate. Exiting...');
        exit(0);
      };
  }
};

module.exports = terminate;
