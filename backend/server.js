require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const API_PORT = 3001;
const app = express();
const router = express.Router();

const User = require('./user.js');
const Category = require('./category.js');
const Entry = require('./entry.js');

mongoose.connect(
  process.env.DATABASE_URI,
  { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once('open', () => console.log('Connected to the database!'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// TODO: Add basic CRUD API calls
// Prepend /api on all API calls
app.use('/api', router);

router.post('/new-user', (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let hash = req.body.hash;
  let salt = req.body.salt;

  User.findOne({ email: email }, (err, foundUser) => {
    if (err) return;
    if (foundUser) {
      res.send('That email address is already in use.');
    } else {
      let newUser = new User({
        name: name,
        email: email,
        hash: hash,
        salt: salt
      });

      newUser.save((err, createdUser) => {
        if (err) return;
        res.json({
          name: name,
          email: email,
          hash: hash,
          salt: salt,
          _id: createdUser._id
        });
      });
    }
  });
});

router.get('/users', (req, res) => {
  User.find({}, 'name email _id', (err, users) => {
    let output = [];

    users.map(user => {
      output.push(user);
    });

    res.send(output);
  });
});

// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
