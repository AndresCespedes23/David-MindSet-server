const express = require('express');

const router = express.Router();
const administrators = require('../controllers/administrators');
// tmb carpeta de funciones

router.get('/', administrators.getAll);
//router.post('/add', administrators.add);
//router.put('/edit/:id', administrators.edit);
//router.delete('/remove/:id', administrators.remove);
//router.get('/byName', administrators.getByName);
router.get('/:id', administrators.getById);

module.exports = router;
