const express = require('express');

const profileTypes = require('./profile-types');
const psychologists = require('./psychologists');
const candidates = require('./candidates');
const sessions = require('./sessions');

const router = express.Router();

router.use('/psychologists', psychologists);
router.use('/candidates', candidates);
router.use('/profile-types', profileTypes);
router.use('/sessions', sessions);

module.exports = router;
