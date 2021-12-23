const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
const openPositions = require('../controllers/open-positions');
const {
  validateFormat,
  isNotEmpty,
  validateLength,
} = require('../validators/open-positions');

router.get('/', authMiddleware, openPositions.getAll);
router.get('/search', authMiddleware, validateFormat, openPositions.search);
router.get('/:id', authMiddleware, validateFormat, openPositions.getById);
router.post(
  '/',
  authMiddleware,
  isNotEmpty,
  validateLength,
  validateFormat,
  openPositions.add,
);
router.put(
  '/:id',
  authMiddleware,
  validateFormat,
  validateLength,
  openPositions.edit,
);
router.delete('/:id', authMiddleware, validateFormat, openPositions.remove);

module.exports = router;
