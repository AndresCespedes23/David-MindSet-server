const express = require('express');

const router = express.Router();
const profileTypes = require('../controllers/profile-types');

router.get('/', profileTypes.getAll);
router.get('/search', profileTypes.search);
router.post('/add', profileTypes.add);
router.put('/edit/:id', profileTypes.edit);
router.delete('/remove/:id', profileTypes.remove);
router.get('/:id', profileTypes.getById);

module.exports = router;
