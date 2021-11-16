const express = require('express');
const path = require('path');
const psychologists = require('./psychologists');
const candidates = require('./candidates');
const openPositions = require('./open-position');

const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../public') });
});

router.get('/server-status', (req, res) => res.send({
  status: 'Server OK',
}));

router.use('/psychologists', psychologists);
router.use('/candidates', candidates);
router.use('/open-positions', openPositions);

module.exports = router;
