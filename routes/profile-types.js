const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
const profileTypes = require('../controllers/profile-types');
const {
  validateFormat,
  isNotEmpty,
  validateLength,
} = require('../validators/profile-types');

router.get('/', authMiddleware, profileTypes.getAll);
router.get('/search', authMiddleware, validateFormat, profileTypes.search);
router.get('/:id', authMiddleware, validateFormat, profileTypes.getById);
router.post(
  '/',
  authMiddleware,
  validateFormat,
  isNotEmpty,
  validateLength,
  profileTypes.add,
);
router.put(
  '/:id',
  authMiddleware,
  validateFormat,
  validateLength,
  profileTypes.edit,
);
router.delete('/:id', authMiddleware, validateFormat, profileTypes.remove);

module.exports = router;
