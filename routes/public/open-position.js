const express = require('express');

const router = express.Router();
const openPositions = require('../../controllers/public/open-positions');

router.get('/', openPositions.getAll);

module.exports = router;
