const express = require('express');

const router = express.Router();
const companies = require('../controllers/companies');
const {
  required,
  requiredCompanies,
  isObjectID,
  bodyNotEmpty,
  validateLength,
  validateDataType,
} = require('../validators/companies');

const { getAll, add, edit, remove, getByName, getById } = companies;

router.get('/', getAll);
router.post('/', bodyNotEmpty, requiredCompanies, required, validateDataType, validateLength, add);
router.put('/:id', isObjectID, bodyNotEmpty, validateDataType, validateLength, edit);
router.delete('/:id', isObjectID, remove);
router.get('/search', getByName);
router.get('/:id', isObjectID, getById);

module.exports = router;
