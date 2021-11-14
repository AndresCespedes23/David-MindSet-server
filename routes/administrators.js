const express = require('express');

const router = express.Router();
const administrators = require('../controllers/administrators');
// tmb a la carpeta de funciones

router.get('/', administrators.getAll);
router.get('/search', administrators.search);
router.get('/:id', administrators.getById);
router.post('/', administrators.add);
router.put('/:id', administrators.edit);
router.delete('/:id', administrators.remove);

module.exports = router;
