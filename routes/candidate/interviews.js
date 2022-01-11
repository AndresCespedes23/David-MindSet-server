const express = require('express');

const router = express.Router();
const interviews = require('../../controllers/candidate/interviews');
const { validateFormat } = require('../../validators/interviews');

router.get('/:id', validateFormat, interviews.getPending);
router.patch('/:id', validateFormat, interviews.changeStatus);

module.exports = router;
