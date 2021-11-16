const express = require('express');
const path = require('path');
const applications = require('./applications');
const psychologists = require('./psychologists');
const companies = require('./companies');
const interviews = require('./interviews');
const candidates = require('./candidates');
const openPositions = require('./open-position');

const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../public') });
});

router.get('/server-status', (req, res) => res.send({
  status: 'Server OK',
}));

router.use('/applications', applications);
router.use('/companies', companies);
router.use('/psychologists', psychologists);
router.use('/interviews', interviews);
router.use('/candidates', candidates);
router.use('/open-positions', openPositions);

module.exports = router;
