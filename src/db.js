const { connect } = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

let db;

connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
  .then((conn) => {
    db = conn;
    // console.log('conn: ', conn);
    console.log('Db... okay! :)');
  })
  .catch((err) => {
    console.log(err);
    console.log('Db... not okay! :(');
    process.exit(1);
  });
// database func
module.exports = {
  MONGODB_URI,
  db: () => db,
};
