const express = require('express');

const router = express.Router();
const interviews = require('../controllers/interviews');

router.get('/', interviews.getAll);
router.post('/', interviews.add);
router.put('/:id', interviews.edit);
router.delete('/:id', interviews.remove);
router.get('/byCompany', interviews.getByCompany);
router.get('/:id', interviews.getById);

module.exports = router;
