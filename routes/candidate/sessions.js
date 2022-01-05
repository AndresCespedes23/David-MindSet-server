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

router.get('/availableDates', authMiddleware, sessions.getAvailableSessions);
router.get('/:id', authMiddleware, validateFormat, sessions.getSession);
router.post('/', isNotEmpty, validateLength, validateFormat, sessionStillAvailable, sessions.add);
router.put('/:id', authMiddleware, validateFormat, sessions.edit);
router.delete('/:id', authMiddleware, validateFormat, sessions.remove);

module.exports = router;
