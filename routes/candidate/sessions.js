const express = require('express');
const authMiddleware = require('../../middleware/authMiddleware');

const router = express.Router();
const sessions = require('../../controllers/candidate/sessions');
const {
  validateFormat,
  isNotEmpty,
  validateLength,
  sessionStillAvailable,
} = require('../../validators/sessions');

router.get('/availableDates', sessions.getAvailableSessions);
router.get('/:id', authMiddleware, validateFormat, sessions.getById);
router.post('/', isNotEmpty, validateLength, validateFormat, sessions.add);
router.put('/:id', authMiddleware, validateFormat, sessions.edit);
router.delete('/:id', authMiddleware, validateFormat, sessions.remove);

module.exports = router;
