const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();
const port = 8000;

/* MongoDB Atlas Connection */
mongoose.connect(
  'mongodb+srv://radium:radium123456@cluster0.urj6t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  (err) => {
    if (err) {
      console.log('error connecting database');
    } else {
      console.log('data base connected');
    }
  },
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Open your browser in http://localhost:${port}`);
});
