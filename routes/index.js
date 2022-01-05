const express = require('express');

const path = require('path');
const auth = require('./auth');

const admin = require('./admin');
const candidate = require('./candidate');
const psychologist = require('./psychologist');

const router = express.Router();
router.use(express.static('public'));

router.get('/api', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../public') });
});

router.get('/server-status', (req, res) => res.send({ status: 'Server OK' }));

router.use('/auth', auth);

router.use('/admin', admin);
router.use('/candidate', candidate);
router.use('/psychologist', psychologist);

module.exports = router;
