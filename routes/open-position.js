const express = require('express');

const router = express.Router();
const openPositions = require('../controllers/open-positions');

router.get('/', openPositions.getAll);
router.get('/byIdCompany/:id', openPositions.getByIdCompany);
router.post('/', openPositions.add);
router.put('/:id', openPositions.edit);
router.delete('/:id', openPositions.remove);
router.get('/:id', openPositions.getById);

module.exports = router;
