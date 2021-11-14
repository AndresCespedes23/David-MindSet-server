const express = require('express');

const router = express.Router();
const companies = require('../controllers/companies');
const { required, isObjectID, bodyNotEmpty, validateLength } = require('../validators/shared');
const { requiredCompanies } = require('../validators/companies');

const { getAll, add, edit, remove, getByName, getById } = companies;

router.get('/', getAll);
router.post('/', bodyNotEmpty, validateLength, requiredCompanies, required, add);
router.put('/:id', isObjectID, bodyNotEmpty, validateLength, edit);
router.delete('/:id', isObjectID, remove);
router.get('/search', getByName);
router.get('/:id', isObjectID, getById);

module.exports = router;
