/* eslint-disable comma-dangle */
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();
const port = 8000;

mongoose.connect(
  'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false',
  (err) => {
    if (err) {
      console.log('error connecting database');
    } else {
      console.log('data base connected');
    }
  }
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Open your browser in http://localhost:${port}`);
});
