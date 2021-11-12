const express = require('express');
const path = require('path');
const psychologists = require('./psychologists');

const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../public') });
});

router.use('/psychologists', psychologists);

module.exports = router;
