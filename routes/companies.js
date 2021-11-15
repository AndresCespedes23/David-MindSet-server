const express = require('express');

const router = express.Router();
const companies = require('../controllers/companies');
const {
  required,
  requiredCompanies,
  validateIdformat,
  bodyNotEmpty,
  validateLength,
  validateDataType,
} = require('../validators/companies');

const { getAll, add, edit, remove, search, getById } = companies;

router.get('/', getAll);
router.post('/', bodyNotEmpty, requiredCompanies, required, validateDataType, validateLength, add);
router.put('/:id', validateIdformat, bodyNotEmpty, validateDataType, validateLength, edit);
router.delete('/:id', validateIdformat, remove);
router.get('/search', search);
router.get('/:id', validateIdformat, getById);

module.exports = router;
