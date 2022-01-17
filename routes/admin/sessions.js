const express = require('express');
const authMiddleware = require('../../middleware/authMiddleware');

const router = express.Router();
const sessions = require('../../controllers/admin/sessions');
const { validateFormat } = require('../../validators/sessions');

router.get('/', sessions.getAll);
router.patch('/:id', authMiddleware, validateFormat, sessions.cancelOutdatedSessions);
router.get('/:id', authMiddleware, validateFormat, sessions.getById);

module.exports = router;
