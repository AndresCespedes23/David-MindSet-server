const express = require('express');
const authMiddleware = require('../../middleware/authMiddleware');

const router = express.Router();
const candidates = require('../../controllers/admin/candidates');
const {
  validateFormat,
} = require('../../validators/candidates');

router.get('/', authMiddleware, candidates.getAll);
// router.get('/search', authMiddleware, candidates.search);
router.get('/:id', authMiddleware, validateFormat, candidates.getById);
router.put(
  '/:id',
  authMiddleware,
  candidates.edit,
);
router.delete('/:id', authMiddleware, validateFormat, candidates.remove);

module.exports = router;
