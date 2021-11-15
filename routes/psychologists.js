const express = require('express');

const router = express.Router();
const psychologists = require('../controllers/psychologists');
const { isObjectID, isNotEmpty, validateLength, validateFormat } = require('../validators/psychologists');

router.get('/', psychologists.getAll);
router.get('/search', psychologists.search);
router.get('/:id', isObjectID, psychologists.getById);
router.post('/add', isNotEmpty, validateFormat, validateLength, psychologists.add);
router.put('/edit/:id', validateFormat, validateLength, psychologists.edit);
router.delete('/remove/:id', isObjectID, psychologists.remove);

module.exports = router;
