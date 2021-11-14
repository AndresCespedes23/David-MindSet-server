const express = require('express');

const router = express.Router();
const openPositions = require('../controllers/open-positions');
const openPositionsValidator = require('../validators/open-positions');

router.get('/', openPositions.getAll);
router.get('/byIdCompany/:id', openPositionsValidator.isObjectID, openPositions.getByIdCompany);
router.post('/', openPositionsValidator.isNotEmpty, openPositionsValidator.validateLength, openPositions.add);
router.put('/:id', openPositionsValidator.isObjectID, openPositions.edit);
router.delete('/:id', openPositionsValidator.isObjectID, openPositions.remove);
router.get('/:id', openPositionsValidator.isObjectID, openPositions.getById);

module.exports = router;
