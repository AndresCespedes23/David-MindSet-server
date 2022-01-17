const express = require('express');

const path = require('path');
const auth = require('./auth');

const admin = require('./admin');
const candidate = require('./candidate');
const psychologist = require('./psychologist');

const {
  authMiddlewareCandidate,
  authMiddlewareAdmin,
  authMiddlewarePsychologist,
} = require('../middleware/authMiddleware');

const router = express.Router();
router.use(express.static('public'));

router.get('/api', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../public') });
});

router.get('/server-status', (req, res) => res.send({ status: 'Server OK' }));

router.use('/auth', auth);

router.use('/admin', authMiddlewareAdmin, admin);
router.use('/candidate', authMiddlewareCandidate, candidate);
router.use('/psychologist', authMiddlewarePsychologist, psychologist);

module.exports = router;
