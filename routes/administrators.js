const express = require('express');

const router = express.Router();
const administrators = require('../controllers/administrators');
const { isNotEmpty, validateFormat, validateLength } = require('../validators/administrators');

router.get('/', administrators.getAll);
router.get('/search', administrators.search);
router.get('/:id', administrators.getById);
router.post('/', isNotEmpty, validateFormat, validateLength, administrators.add);
router.put('/:id', validateFormat, validateLength, administrators.edit);
router.delete('/:id', administrators.remove);

module.exports = router;
