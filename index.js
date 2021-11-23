//require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes');
const PORT = 8000;
const app = express();

mongoose.connect(
  /* process.env.DATABASE_URL */ 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false',
  (err) => {
    if (err) {
      console.log('error connecting database');
    } else {
      console.log('database connected');
    }
  },
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use('/api', routes);

app.use((req, res) =>
  res.json({
    msg: `${req.url}/ : Error 400 Bad request`,
  }),
);

app.listen(/* process.env.PORT */ PORT, () => {
  console.log(`Open your browser in http://localhost:${PORT}`);
});
