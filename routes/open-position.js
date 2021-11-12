const express = require('express');

const router = express.Router();
const openPositions = require('../controllers/open-positions');

router.get('/', openPositions.getAll);
router.get('/add', openPositions.add);
router.get('/byIdCompany/:id', openPositions.getByIdCompany);
router.get('/edit/:id', openPositions.edit);
router.get('/remove/:id', openPositions.remove);
router.get('/:id', openPositions.getById);

module.exports = router;
