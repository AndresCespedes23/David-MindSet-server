const mongoose = require('mongoose');

const isNotEmpty = (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).json({ msg: 'You must complete your name' });
  }
  return next();
};

const validateFormat = (req, res, next) => {
  if (req.params.id && !mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ msg: 'Invalid id' });
  }
  return next();
};

const validateLength = (req, res, next) => {
  if (req.body.name
    && (req.body.name.length < 1
    || req.body.name.length > 50)) {
    return res.status(400).json({ msg: 'Name must be between 1 and 50 characters' });
  }
  return next();
};

module.exports = {
  isNotEmpty,
  validateFormat,
  validateLength,
};
