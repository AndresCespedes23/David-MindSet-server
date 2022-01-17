const express = require('express');

const router = express.Router();
const candidates = require('../../controllers/admin/candidates');
const { validateFormat } = require('../../validators/candidates');

router.get('/', candidates.getAll);
// router.get('/search', candidates.search);
router.get('/:id', validateFormat, candidates.getById);
router.put('/:id', candidates.edit);
router.delete('/:id', validateFormat, candidates.remove);

module.exports = router;
