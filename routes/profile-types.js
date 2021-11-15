const express = require('express');

const router = express.Router();
const profileTypes = require('../controllers/profile-types');

router.get('/', profileTypes.getAll);
router.get('/search', profileTypes.search);
router.get('/:id', profileTypes.getById);
router.post('/', profileTypes.add);
router.put('/:id', profileTypes.edit);
router.delete('/:id', profileTypes.remove);

module.exports = router;
