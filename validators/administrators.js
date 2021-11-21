const mongoose = require('mongoose');

const isNotEmpty = (req, res, next) => {
  if (!req.body.firstName) {
    return res.status(400).json({ msg: 'First name is required' });
  }
  if (!req.body.lastName) {
    return res.status(400).json({ msg: 'Last name is required' });
  }
  if (!req.body.email) {
    return res.status(400).json({ msg: 'Email is required' });
  }
  if (!req.body.password) {
    return res.status(400).json({ msg: 'Password is required' });
  }
  return next();
};

const validateId = (req, res, next) => {
  if (req.params.id
    && !mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ msg: 'Invalid id' });
  }
  return next();
};

const validateEmail = (req, res, next) => {
  if (req.body.email
    && (!req.body.email.includes('@')
    || !req.body.email.includes('.'))) {
    return res.status(400).json({ msg: 'Invalid email' });
  }
  return next();
};

const validateLength = (req, res, next) => {
  if (req.body.firstName
    && (req.body.firstName.length >= 2
    || req.body.firstName.length <= 40)) {
    return res.status(400).json({ msg: 'First name should be beetween 2 and 40 characters' });
  }
  if (req.body.lastName
    && (req.body.lastName.length >= 2
    || req.body.lastName.length <= 40)) {
    return res.status(400).json({ msg: 'Last name should be beetween 2 and 40 characters' });
  }
  if (req.body.email
    && (req.body.email.length >= 5
    || req.body.email.length <= 40)) {
    return res.status(400).json({ msg: 'Email should be beetween 5 and 40 characters' });
  }
  if (req.body.password !== undefined) {
    if (!(req.body.password.length >= 8 && req.body.password.length <= 16)) {
      return res.status(400).json({ msg: 'Password must be between 8 and 16 characters' });
    }
  }
  return next();
};
module.exports = {
  isNotEmpty,
  validateId,
  validateEmail,
  validateLength,
};
