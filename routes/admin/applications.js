const express = require('express');

const router = express.Router();
const applications = require('../../controllers/admin/applications');
const { validateFormat } = require('../../validators/applications');

router.get('/', applications.getAll);
router.get('/report', applications.getReport);
router.get('/filtered-report', applications.getFilteredReport);
router.put('/:id', applications.edit);
router.get('/:id', validateFormat, applications.getById);
module.exports = router;
