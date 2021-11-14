const express = require('express');

const router = express.Router();
const candidates = require('../controllers/candidates');
const { isNotEmpty, isObjectID, validateLength } = require('../validators/candidates');

router.get('/', candidates.getAll);
router.get('/byName/:name', candidates.getByName);
router.get('/:id', isObjectID, candidates.getById);
router.post('/', isNotEmpty, validateLength, candidates.add);
router.put('/:id', isObjectID, candidates.edit);
router.delete('/:id', isObjectID, candidates.remove);

module.exports = router;
