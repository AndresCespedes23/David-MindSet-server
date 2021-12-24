const express = require('express');
const controller = require('../controllers/auth');
const validations = require('../validators/auth');
const user = require('../controllers/users');

const router = express.Router();

const { register, loginServer } = controller;

// deberíamos agregar todas las validaciones del add de candidate?
router.post('/register', validations.required, register);

// BORRAR!!!!
router.get('/', user.getAll);
router.get('/loginServer', loginServer);

module.exports = router;
