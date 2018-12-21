require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./routes')(app);

mongoose.connect(
  process.env.DATABASE_URI,
  { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once('open', () => console.log('Connected to the database!'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// launch our backend into a port
app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
