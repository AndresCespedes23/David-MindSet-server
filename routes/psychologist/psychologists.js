const express = require('express');
const authMiddleware = require('../../middleware/authMiddleware');

const router = express.Router();
const psychologists = require('../../controllers/psychologist/psychologists');
const {
  validateLength,
  validateFormat,
  validateTimeRange,
} = require('../../validators/psychologists');

router.get('/:id', authMiddleware, validateFormat, psychologists.getById);
router.put(
  '/:id',
  authMiddleware,
  validateFormat,
  validateLength,
  validateTimeRange,
  psychologists.edit,
);

module.exports = router;
