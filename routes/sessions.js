const express = require('express');

const router = express.Router();
const sessions = require('../controllers/sessions');
const sessionsValidator = require('../validators/sessions');

router.get('/', sessions.getAll);
router.get('/byIdCompany/:id', sessionsValidator.validateFormat, sessions.getByIdSession);
router.post(
  '/',
  sessionsValidator.isNotEmpty,
  sessionsValidator.validateLength,
  sessionsValidator.validateFormat,
  sessions.add,
);
//add route for search by psy id or can id
router.put('/:id', sessionsValidator.validateFormat, sessions.edit);
router.delete('/:id', sessionsValidator.validateFormat, sessions.remove);
router.get('/:id', sessionsValidator.validateFormat, sessions.getById);

module.exports = router;