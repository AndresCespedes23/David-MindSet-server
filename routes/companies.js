const express = require('express');

const router = express.Router();
const companies = require('../controllers/companies');

const { getAll, add, edit, remove, getByName, getById } = companies;

router.get('/', getAll);
router.post('/add', add);
router.put('/edit/:id', edit);
router.delete('/remove/:id', remove);
router.get('/byName/:name', getByName);
router.get('/:id', getById);

module.exports = router;
