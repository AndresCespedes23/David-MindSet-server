const express = require('express');
const authMiddleware = require('../../middleware/authMiddleware');

const router = express.Router();
const profileTypes = require('../../controllers/psychologist/profile-types');
const {
  validateFormat,
} = require('../../validators/profile-types');

router.get('/', authMiddleware, profileTypes.getAll);
router.get('/:id', authMiddleware, validateFormat, profileTypes.getById);

module.exports = router;
