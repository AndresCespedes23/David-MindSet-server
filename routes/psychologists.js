const express = require('express');

const router = express.Router();
const psychologists = require('../controllers/psychologists');
const { isNotEmpty, validateLength, validateFormat } = require('../validators/psychologists');

router.get('/', psychologists.getAll);
router.get('/search', psychologists.search);
router.get('/:id', validateFormat, psychologists.getById);
router.post('/add', isNotEmpty, validateFormat, validateLength, psychologists.add);
router.put('/edit/:id', validateFormat, validateLength, psychologists.edit);
router.delete('/remove/:id', validateFormat, psychologists.remove);

module.exports = router;
