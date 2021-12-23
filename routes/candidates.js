const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
const candidates = require('../controllers/candidates');
const {
  isNotEmpty,
  validateFormat,
  validateLength,
} = require('../validators/candidates');

router.get('/', authMiddleware, candidates.getAll);
router.get('/search', authMiddleware, candidates.search);
router.get('/:id', authMiddleware, validateFormat, candidates.getById);
router.post(
  '/',
  authMiddleware,
  isNotEmpty,
  validateLength,
  validateFormat,
  candidates.add,
);
router.put(
  '/:id',
  authMiddleware,
  validateFormat,
  validateLength,
  candidates.edit,
);
router.delete('/:id', authMiddleware, validateFormat, candidates.remove);

module.exports = router;
