const express = require('express');
const authMiddleware = require('../../middleware/authMiddleware');

const router = express.Router();
const applications = require('../../controllers/admin/applications');
const { validateFormat } = require('../../validators/applications');

router.get('/', authMiddleware, applications.getAll);
router.get('/report', authMiddleware, applications.getReport);
router.get('/filtered-report', authMiddleware, applications.getFilteredReport);
router.put('/:id', authMiddleware, applications.edit);
router.get('/:id', authMiddleware, validateFormat, applications.getById);
module.exports = router;
