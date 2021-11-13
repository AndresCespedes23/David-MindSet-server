const express = require('express');

const router = express.Router();
const profileTypes = require('../controllers/profile-types');

router.get('/profile-types', profileTypes.getAll);
router.get('/profile-types/byName/:name', profileTypes.getByName);
router.post('/profile-types/add', profileTypes.add);
router.put('/profile-types/edit/:id', profileTypes.edit);
router.delete('/profile-types/remove/:id', profileTypes.remove);
router.get('/profile-types/:id', profileTypes.getById);

module.exports = router;
