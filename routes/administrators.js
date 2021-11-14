const express = require('express');

const router = express.Router();
const administrators = require('../controllers/administrators');
// tmb carpeta de funciones

router.get('/', administrators.getAll);
router.post('/', administrators.add);
router.put('/:id', administrators.edit);
//router.delete('/:id', administrators.remove);
router.get('/byName/:name', administrators.getByName);
router.get('/:id', administrators.getById);

module.exports = router;
