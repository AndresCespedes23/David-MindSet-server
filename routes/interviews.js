const express = require('express');

const router = express.Router();
const interviews = require('../controllers/interviews');

const { validateFormat, isNotEmpty } = require('../validators/interviews');

router.get('/', interviews.getAll);
router.post('/', validateFormat, isNotEmpty, interviews.add);
router.put('/:id', validateFormat, interviews.edit);
router.delete('/:id', validateFormat, interviews.remove);
router.get('/search', validateFormat, interviews.search);
router.get('/:id', validateFormat, interviews.getById);

module.exports = router;
