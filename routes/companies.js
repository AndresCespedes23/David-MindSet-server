const express = require('express');

const router = express.Router();
const companies = require('../controllers/companies');
const { required } = require('../validators/shared');
const { requiredCompanies } = require('../validators/companies');

const { getAll, add, edit, remove, getByName, getById } = companies;

router.get('/', getAll);
router.post('/', add, requiredCompanies, required);
router.put('/:id', edit);
router.delete('/:id', remove);
router.get('/byName/:name', getByName);
router.get('/:id', getById);

module.exports = router;
