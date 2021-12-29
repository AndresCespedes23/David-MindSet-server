const express = require('express');
const controller = require('../controllers/auth');
const validations = require('../validators/auth');
const {
  isNotEmpty,
  validateLength,
} = require('../validators/candidates');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

const { register, loginServer } = controller;

router.post('/register', validations.required, isNotEmpty, validateLength, register);
router.get('/loginServer', authMiddleware, loginServer);

module.exports = router;
