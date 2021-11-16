const express = require('express');

const router = express.Router();
const companies = require('../controllers/companies');
const {
  required,
  bodyNotEmpty,
  validateLength,
  validateDataTypeAndFormat,
} = require('../validators/companies');

const { getAll, add, edit, remove, search, getById } = companies;

router.get('/', getAll);
router.post('/', bodyNotEmpty, required, validateDataTypeAndFormat, validateLength, add);
router.put('/:id', bodyNotEmpty, validateDataTypeAndFormat, validateLength, edit);
router.delete('/:id', remove);
router.get('/search', search);
router.get('/:id', getById);

module.exports = router;
