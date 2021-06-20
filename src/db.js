const { connect } = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

let db;
function getDb() {
  return db;
}

connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
  .then((conn) => {
    db = conn;
  })
  .catch((err) => {
    console.log(err);
    console.log('Db... not okay! :(');
    console.log('Did you copy the correct connection string?');
    process.exit(1);
  });

function wait(milliseconds) {
  return new Promise((r) => setTimeout(r, milliseconds));
}

function waitingForDb() {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve) => {
    while (!getDb()) {
      await wait(500);
    }
    resolve();
  });
}

module.exports = {
  MONGODB_URI,
  db: getDb,
  waitingForDb,
};
