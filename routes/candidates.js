const express = require('express');

const router = express.Router();
const candidates = require('../controllers/candidates');
const candidatesValidator = require('../validators/candidates');

router.get('/', candidates.getAll);
router.post('/', candidatesValidator.isNotEmpty, candidates.add);
router.put('/:id', candidatesValidator.isObjectID, candidates.edit);
router.delete('/:id', candidatesValidator.isObjectID, candidates.remove);
router.get('/byName/:name', candidates.getByName);
router.get('/:id', candidatesValidator.isObjectID, candidates.getById);

module.exports = router;
