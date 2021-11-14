const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();
const port = 8000;

/* MongoDB Atlas Connection */
mongoose.connect('mongodb+srv://userDavid:pswDavid@radiumcluster.ffqld.mongodb.net/mindset2021?retryWrites=true&w=majority', (err) => {
  if (err) {
    console.log('error connecting database');
  } else {
    console.log('database connected');
  }
});

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Open your browser in http://localhost:${port}`);
});
