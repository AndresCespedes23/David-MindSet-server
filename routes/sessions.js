const express = require('express');

const router = express.Router();
const sessions = require('../controllers/sessions');
const { validateFormat, isNotEmpty, validateLength } = require('../validators/sessions');

router.get('/', sessions.getAll);
router.post(
  '/',
  isNotEmpty,
  validateLength,
  validateFormat,
  sessions.add,
);
router.get('/search', validateFormat, sessions.search);
router.put('/:id', validateFormat, sessions.edit);
router.delete('/:id', validateFormat, sessions.remove);
router.get('/:id', validateFormat, sessions.getById);

module.exports = router;
