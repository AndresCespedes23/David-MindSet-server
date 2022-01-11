const express = require('express');
const authMiddleware = require('../../middleware/authMiddleware');

const router = express.Router();
const psychologists = require('../../controllers/psychologist/psychologists');
const {
  validateLength,
  validateFormat,
} = require('../../validators/psychologists');

router.get('/', authMiddleware, psychologists.getAll);
router.get('/:id', authMiddleware, validateFormat, psychologists.getById);

router.put(
  '/:id',
  authMiddleware,
  validateFormat,
  validateLength,
  psychologists.edit,
);

module.exports = router;
