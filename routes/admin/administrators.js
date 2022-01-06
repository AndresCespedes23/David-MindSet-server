const express = require('express');
const authMiddleware = require('../../middleware/authMiddleware');

const router = express.Router();
const administrators = require('../../controllers/admin/administrators');
const {
  // isNotEmpty,
  validateId,
  validateEmail,
  validateLength,
} = require('../../validators/administrators');

router.get('/', authMiddleware, administrators.getAll);
// router.get('/search', authMiddleware, validateId, administrators.search);
router.get('/:id', authMiddleware, validateId, administrators.getById);
// router.post(
//   '/',
//   authMiddleware,
//   isNotEmpty,
//   validateId,
//   validateEmail,
//   validateLength,
//   administrators.add,
// );
router.put(
  '/:id',
  authMiddleware,
  validateId,
  validateEmail,
  validateLength,
  administrators.edit,
);
router.delete('/:id', authMiddleware, validateId, administrators.remove);

module.exports = router;
