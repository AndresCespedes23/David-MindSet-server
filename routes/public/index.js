const express = require('express');

const openPositions = require('./open-position');

const router = express.Router();

router.use('/open-positions', openPositions);

module.exports = router;
