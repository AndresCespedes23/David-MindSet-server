const express = require('express');

const profileTypes = require('./profile-types');
const administrators = require('./administrators');
const applications = require('./applications');
const psychologists = require('./psychologists');
const companies = require('./companies');
const interviews = require('./interviews');
const candidates = require('./candidates');
const openPositions = require('./open-position');
const sessions = require('./sessions');

const router = express.Router();

router.use('/administrators', administrators);
router.use('/applications', applications);
router.use('/companies', companies);
router.use('/psychologists', psychologists);
router.use('/interviews', interviews);
router.use('/candidates', candidates);
router.use('/open-positions', openPositions);
router.use('/profile-types', profileTypes);
router.use('/sessions', sessions);

module.exports = router;
