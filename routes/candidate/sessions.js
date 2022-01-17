const express = require('express');

const router = express.Router();
const sessions = require('../../controllers/candidate/sessions');
const {
  validateFormat,
  isNotEmpty,
  validateLength,
  sessionStillAvailable,
  checkForExistingSession,
} = require('../../validators/sessions');

router.get('/availableDates', sessions.getAvailableSessions);
router.get('/:id', validateFormat, sessions.getSession);
router.post(
  '/',
  isNotEmpty,
  validateLength,
  validateFormat,
  sessionStillAvailable,
  checkForExistingSession,
  sessions.add,
);
router.put('/:id', validateFormat, sessions.edit);
router.delete('/:id', validateFormat, sessions.remove);

module.exports = router;
