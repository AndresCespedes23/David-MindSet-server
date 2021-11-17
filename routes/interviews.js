const express = require('express');

const router = express.Router();
const interviews = require('../controllers/interviews');

const { validateFormat, isNotEmpty } = require('../validators/interviews');

router.get('/', interviews.getAll);
router.get('/search', validateFormat, interviews.search);
router.get('/:id', validateFormat, interviews.getById);
router.post('/', validateFormat, isNotEmpty, interviews.add);
router.put('/:id', validateFormat, interviews.edit);
router.delete('/:id', validateFormat, interviews.remove);

module.exports = router;
