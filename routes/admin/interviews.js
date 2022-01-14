const express = require('express');
const authMiddleware = require('../../middleware/authMiddleware');

const router = express.Router();
const interviews = require('../../controllers/admin/interviews');

const {
  validateFormat, isNotEmpty, interviewStillAvailable, interviewBetweenDates,
} = require('../../validators/interviews');

router.get('/', authMiddleware, interviews.getAll);
// router.get('/search', authMiddleware, validateFormat, interviews.search);
router.get('/:id', authMiddleware, validateFormat, interviews.getById);
router.post('/', authMiddleware, validateFormat, isNotEmpty, interviewStillAvailable, interviewBetweenDates, interviews.add);
router.put('/:id', authMiddleware, validateFormat, interviews.edit);
router.delete('/:id', authMiddleware, validateFormat, interviews.remove);
router.get('/availableDates/:id', authMiddleware, interviews.getAvailableInterviews);

module.exports = router;
