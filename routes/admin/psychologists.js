const express = require('express');

const router = express.Router();
const psychologists = require('../../controllers/admin/psychologists');
const { isNotEmpty, validateLength, validateFormat } = require('../../validators/psychologists');

router.get('/', psychologists.getAll);
// router.get('/search', psychologists.search);
router.get('/:id', validateFormat, psychologists.getById);
router.post('/', isNotEmpty, validateFormat, validateLength, psychologists.add);
router.put('/:id', validateFormat, validateLength, psychologists.edit);
router.delete('/:id', validateFormat, psychologists.remove);

module.exports = router;
