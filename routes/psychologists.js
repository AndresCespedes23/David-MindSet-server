const express = require('express');

const router = express.Router();
const psychologists = require('../controllers/psychologists');
const { isObjectID, isNotEmpty } = require('../validators/psychologists');

router.get('/', psychologists.getAll);
router.post('/add', isNotEmpty, psychologists.add);
router.put('/edit/:id', isNotEmpty, psychologists.edit);
router.delete('/remove/:id', isObjectID, psychologists.remove);
router.get('/byName', psychologists.getByName);
router.get('/:id', isObjectID, psychologists.getById);

module.exports = router;
