const express = require('express');
const controller = require('../controllers/auth');
const validations = require('../validators/auth');
const { isNotEmpty, validateLength } = require('../validators/candidates');

const router = express.Router();

const { register, loginServer } = controller;

router.post('/register', validations.required, isNotEmpty, validateLength, register);
router.get('/loginServer', loginServer);

module.exports = router;
