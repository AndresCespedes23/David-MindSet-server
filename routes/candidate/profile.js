const express = require('express');

const router = express.Router();
const candidates = require('../../controllers/candidate/profile');
const {
  validateFormat,
  validateLength,
  validateTimeRange,
} = require('../../validators/candidates');

router.get('/:id', validateFormat, candidates.getById);
router.put('/:id', validateFormat, validateLength, validateTimeRange, candidates.edit);

module.exports = router;
