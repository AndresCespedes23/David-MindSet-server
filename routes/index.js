const express = require('express');
const path = require('path');
const psychologists = require('./psychologists');
const sessions = require('./sessions');

const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../public') });
});

router.get('/server-status', (req, res) => res.send({ status: 'Server OK' }));

router.use('/psychologists', psychologists);
router.use('/sessions', sessions);

module.exports = router;
