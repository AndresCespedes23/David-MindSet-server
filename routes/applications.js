const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
const applications = require('../controllers/applications');
const { validateFormat, isNotEmpty } = require('../validators/applications');

router.get('/', authMiddleware, applications.getAll);
router.get('/search', authMiddleware, validateFormat, applications.search);
router.post('/', authMiddleware, isNotEmpty, validateFormat, applications.add);
router.put(
  '/:id',
  authMiddleware,
  isNotEmpty,
  validateFormat,
  applications.edit,
);
router.delete('/:id', authMiddleware, validateFormat, applications.remove);
router.get('/:id', authMiddleware, validateFormat, applications.getById);
module.exports = router;
