const express = require('express');

const router = express.Router();
const profileTypes = require('../../controllers/psychologist/profile-types');
const { validateFormat } = require('../../validators/profile-types');

router.get('/', profileTypes.getAll);
router.get('/:id', validateFormat, profileTypes.getById);

module.exports = router;
