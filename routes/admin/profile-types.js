const express = require('express');

const router = express.Router();
const profileTypes = require('../../controllers/admin/profile-types');
const { validateFormat, isNotEmpty, validateLength } = require('../../validators/profile-types');

router.get('/', profileTypes.getAll);
router.get('/search', validateFormat, profileTypes.search);
router.get('/:id', validateFormat, profileTypes.getById);
router.post('/', validateFormat, isNotEmpty, validateLength, profileTypes.add);
router.put('/:id', validateFormat, validateLength, profileTypes.edit);
router.delete('/:id', validateFormat, profileTypes.remove);

module.exports = router;
