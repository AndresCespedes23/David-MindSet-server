const express = require('express');

const router = express.Router();
const interviews = require('../../controllers/admin/interviews');

const {
  validateFormat,
  isNotEmpty,
  interviewStillAvailable,
  interviewBetweenDates,
} = require('../../validators/interviews');

router.get('/', interviews.getAll);
router.get('/:id', validateFormat, interviews.getById);
router.post(
  '/',
  validateFormat,
  isNotEmpty,
  interviewStillAvailable,
  interviewBetweenDates,
  interviews.add,
);
router.put('/:id', validateFormat, interviews.edit);
router.get('/availableDates/:id', interviews.getAvailableInterviews);
router.patch('/:id', validateFormat, interviews.cancelOutdatedInterviews);

module.exports = router;
