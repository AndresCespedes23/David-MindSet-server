const express = require('express');
const psychologists = require('../controllers/psychologists');

const router = express.Router();

router.get('/', psychologists.getAll);
router.post('/add', psychologists.add);
router.put('/edit/:id', psychologists.edit);
router.delete('/remove/:id', psychologists.remove);
router.get('/byName', psychologists.getByName);
router.get('/:id', psychologists.getById);

module.exports = router;