const express = require('express');
const sessions = require('./sessions');
const profile = require('./profile');
const interviews = require('./interviews');

const router = express.Router();

router.use('/profile', profile);
router.use('/sessions', sessions);
router.use('/interviews', interviews);

module.exports = router;
