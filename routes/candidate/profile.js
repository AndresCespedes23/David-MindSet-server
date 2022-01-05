const express = require('express');
const authMiddleware = require('../../middleware/authMiddleware');

const router = express.Router();
const candidates = require('../../controllers/candidate/profile');
const {
  validateFormat,
  validateLength,
  validateTimeRange,
} = require('../../validators/candidates');

router.get('/:id', authMiddleware, validateFormat, candidates.getById);
router.put(
  '/:id',
  authMiddleware,
  validateFormat,
  validateLength,
  validateTimeRange,
  candidates.edit,
);

module.exports = router;
