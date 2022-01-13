const express = require('express');

const router = express.Router();
const interviews = require('../../controllers/candidate/interviews');
const { validateFormat } = require('../../validators/interviews');

router.get('/pending/:id', validateFormat, interviews.getPending);
router.get('/scheduled/:id', validateFormat, interviews.getScheduled);
router.get('/completed/:id', validateFormat, interviews.getCompleted);
router.patch('/:id', validateFormat, interviews.changeStatus);

module.exports = router;
