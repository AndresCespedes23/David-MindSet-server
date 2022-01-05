const express = require('express');
const authMiddleware = require('../../middleware/authMiddleware');

const router = express.Router();
const sessions = require('../../controllers/psychologist/sessions');
const {
  validateFormat,
  isNotEmpty,
  validateLength,
} = require('../../validators/sessions');

router.get('/', sessions.getAll);
router.post('/', isNotEmpty, validateLength, validateFormat, sessions.add);
router.get('/search', authMiddleware, validateFormat, sessions.search);
router.put('/:id', authMiddleware, validateFormat, sessions.edit);
router.delete('/:id', authMiddleware, validateFormat, sessions.remove);
router.get('/:id', authMiddleware, validateFormat, sessions.getById);

module.exports = router;
