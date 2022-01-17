const express = require('express');

const router = express.Router();
const sessions = require('../../controllers/admin/sessions');
const { validateFormat } = require('../../validators/sessions');

router.get('/', sessions.getAll);
router.patch('/:id', validateFormat, sessions.cancelOutdatedSessions);
router.get('/:id', validateFormat, sessions.getById);

module.exports = router;
