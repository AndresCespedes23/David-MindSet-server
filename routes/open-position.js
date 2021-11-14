const express = require('express');

const router = express.Router();
const openPositions = require('../controllers/open-positions');
const openPositionsValidator = require('../validators/open-positions');

router.get('/', openPositions.getAll);
router.get('/byIdCompany/:id', openPositionsValidator.validateFormat, openPositions.getByIdCompany);
router.post(
  '/',
  openPositionsValidator.isNotEmpty,
  openPositionsValidator.validateLength,
  openPositionsValidator.validateFormat,
  openPositions.add,
);
router.put('/:id', openPositionsValidator.validateFormat, openPositions.edit);
router.delete('/:id', openPositionsValidator.validateFormat, openPositions.remove);
router.get('/:id', openPositionsValidator.validateFormat, openPositions.getById);

module.exports = router;
