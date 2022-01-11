const express = require('express');
const authMiddleware = require('../../middleware/authMiddleware');

const router = express.Router();
const psychologists = require('../../controllers/admin/psychologists');
const {
  isNotEmpty,
  validateLength,
  validateFormat,
} = require('../../validators/psychologists');

router.get('/', authMiddleware, psychologists.getAll);
// router.get('/search', authMiddleware, psychologists.search);
router.get('/:id', authMiddleware, validateFormat, psychologists.getById);
router.post(
  '/',
  authMiddleware,
  isNotEmpty,
  validateFormat,
  validateLength,
  psychologists.add,
);
router.put(
  '/:id',
  authMiddleware,
  validateFormat,
  validateLength,
  psychologists.edit,
);
router.delete('/:id', authMiddleware, validateFormat, psychologists.remove);

module.exports = router;
