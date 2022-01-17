const express = require('express');

const router = express.Router();
const openPositions = require('../controllers/open-positions');
const { validateFormat, isNotEmpty, validateLength } = require('../validators/open-positions');

router.get('/', openPositions.getAll);
router.get('/search', validateFormat, openPositions.search);
router.get('/:id', validateFormat, openPositions.getById);
router.post('/', isNotEmpty, validateLength, validateFormat, openPositions.add);
router.put('/:id', validateFormat, validateLength, openPositions.edit);
router.delete('/:id', validateFormat, openPositions.remove);

module.exports = router;
