module.exports = {
  logger: require('./logger'),
  terminate: require('./terminate'),
  connect: require('./db').connect,
};
