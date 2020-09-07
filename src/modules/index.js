module.exports = {
  logger: require('./logger'),
  terminate: require('./terminate'),
  connect: require('./db').connect,
  MongooseCollectionSync: require('./mongoose-collection-sync'),
  ...require('./task'),
};
