const express = require('express');
const authMiddleware = require('../../middleware/authMiddleware');

const router = express.Router();
const companies = require('../../controllers/admin/companies');
const {
  required,
  bodyNotEmpty,
  validateLength,
  validateDataTypeAndFormat,
} = require('../../validators/companies');

const {
  getAll, add, edit, remove, search, getById,
} = companies;

router.get('/', authMiddleware, getAll);
router.post(
  '/',
  authMiddleware,
  bodyNotEmpty,
  required,
  validateDataTypeAndFormat,
  validateLength,
  add,
);
router.put(
  '/:id',
  authMiddleware,
  bodyNotEmpty,
  validateDataTypeAndFormat,
  validateLength,
  edit,
);
router.delete('/:id', authMiddleware, remove);
router.get('/search', authMiddleware, search);
router.get('/:id', authMiddleware, getById);

module.exports = router;
