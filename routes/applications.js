const express = require('express');
const router = express.Router();
const applications = require('../controllers/applications');

router.get('/', applications.getAll);
router.get('/applications/byPos/:id', applications.getByPosition);
router.get('/applications/byCan/:id', applications.getByCandidate);
router.post('/add', applications.add);
router.put('/edit/:id', applications.edit);
router.delete('/remove/:id', applications.remove);
router.get('/:id', applications.getById);

module.exports = router;