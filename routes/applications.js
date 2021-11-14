const express = require('express');
const router = express.Router();
const applications = require('../controllers/applications');

router.get('/', applications.getAll);
router.get("/byPos/:id", applications.getByPosition);
router.get('/byCan/:id', applications.getByCandidate);
router.post('/', applications.add);
router.put('/:id', applications.edit);
router.delete('/:id', applications.remove);

module.exports = router;