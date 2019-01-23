require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

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

const port = process.env.PORT;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('../routes')(app);

// launch our backend into a port
app.listen(port, () => console.log(`Listening for tests on port ${port}`));

module.exports = app;
