const express = require('express');
const controller = require('../controllers/auth');
const validations = require('../validators/auth');
const {
  isNotEmpty,
  validateLength,
} = require('../validators/candidates');
const user = require('../controllers/users');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

const { register, loginServer } = controller;

router.post('/register', validations.required, isNotEmpty, validateLength, register);
router.get('/loginServer/:email', authMiddleware, loginServer);

// BORRAR!!!!
router.get('/verifyEmail/:email', user.getByEmail);
router.get('/', user.getAll);

module.exports = router;
