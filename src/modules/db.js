const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

async function connect() {
  return mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
}

module.exports = {
  MONGODB_URI,
  connect,
};
