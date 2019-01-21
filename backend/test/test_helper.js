require('dotenv').config();

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(
  process.env.DATABASE_TEST_URI,
  { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once('open', () => console.log('Test database connected!'));
db.on('error', error => {
  console.warn('Error: ', error);
});

before(done => {
  db.dropDatabase(() => {
    done();
  });
});
