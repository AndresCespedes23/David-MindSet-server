const express = require('express');

const router = express.Router();
const administrators = require('../controllers/administrators');
const { isNotEmpty, validateId, validateEmail, validateLength } = require('../validators/administrators');

router.get('/', administrators.getAll);
router.get('/search', validateId, administrators.search);
router.get('/:id', validateId, administrators.getById);
router.post('/', isNotEmpty, validateId, validateEmail, validateLength, administrators.add);
router.put('/:id', validateId, validateLength, administrators.edit);
router.delete('/:id', validateId, administrators.remove);

module.exports = router;
