const express = require('express');

const router = express.Router();
const candidates = require('../controllers/candidates');

router.get('/', candidates.getAll);
router.post('/', candidates.add);
router.put('/:id', candidates.edit);
router.delete('/:id', candidates.remove);
router.get('/byName/:name', candidates.getByName);
router.get('/:id', candidates.getById);

module.exports = router;
