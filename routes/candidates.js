const express = require('express');

const router = express.Router();
const candidates = require('../controllers/candidates');
const { isNotEmpty, validateFormat, validateLength } = require('../validators/candidates');

router.get('/', candidates.getAll);
router.get('/search', candidates.search);
router.get('/:id', validateFormat, candidates.getById);
router.post('/', isNotEmpty, validateLength, candidates.add);
router.put('/:id', validateFormat, candidates.edit);
router.delete('/:id', validateFormat, candidates.remove);

module.exports = router;
