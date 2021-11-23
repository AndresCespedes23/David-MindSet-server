require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes');

const PORT = process.env.PORT || 8000;
const app = express();

mongoose.connect(process.env.DATABASE_URL, (err) => {
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

app.listen(PORT, () => {
  console.log(`Open your browser in http://localhost:${PORT}`);
});
