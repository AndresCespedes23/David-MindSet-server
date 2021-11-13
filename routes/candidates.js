const express = require('express');

const router = express.Router();
const candidates = require('../controllers/candidates');

router.get('/', candidates.getAll);
router.post('/add', candidates.add);
router.put('/edit/:id', candidates.edit);
router.delete('/remove/:id', candidates.remove);
router.get('/byName/:name', candidates.getByName);
router.get('/:id', candidates.getById);

module.exports = router;
