const express = require('express');

const router = express.Router();
const psychologists = require('../../controllers/psychologist/psychologists');
const {
  validateLength,
  validateFormat,
  validateTimeRange,
} = require('../../validators/psychologists');

router.get('/:id', validateFormat, psychologists.getById);
router.put('/:id', validateFormat, validateLength, validateTimeRange, psychologists.edit);

module.exports = router;
