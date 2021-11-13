const express = require('express');

const router = express.Router();
const interviews = require('../controllers/interviews');

router.get('/', interviews.getAll);
router.post('/add', interviews.add);
router.put('/edit/:id', interviews.edit);
router.delete('/remove/:id', interviews.remove);
router.get('/byCompany', interviews.getByCompany);
router.get('/:id', interviews.getById);

module.exports = router;
