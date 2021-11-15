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

const validateFormat = (req, res, next) => {
  if (req.body.firstName && !mongoose.Types.ObjectId.isValid(req.body.firstName)) {
    return res.status(400).json({ msg: 'Invalid first name' });
  }
  if (req.body.lastName && !mongoose.Types.ObjectId.isValid(req.body.lastName)) {
    return res.status(400).json({ msg: 'Invalid last name' });
  }
  if (req.body.email && !mongoose.Types.ObjectId.isValid(req.body.email)
    && req.body.email.includes('@', 2) && !req.body.email.includes('@', -1)
    && req.body.email.includes('.', 5) && !req.body.email.includes('.', -1)) {
    return res.status(400).json({ msg: 'Invalid email' });
  }
  if (req.body.password && !mongoose.Types.ObjectId.isValid(req.body.password)) {
    return res.status(400).json({ msg: 'Invalid password' });
  }
  return next();
};

const validateLength = (req, res, next) => {
  if (req.body.firstName && req.body.firstName.length >= 2 && req.body.firstName.length <= 40) {
    return res.status(400).json({ msg: 'First name should be beetween 2 and 40 characters' });
  }
  if (req.body.lastName && req.body.lastName.length >= 2 && req.body.lastName.length <= 40) {
    return res.status(400).json({ msg: 'Last name should be beetween 2 and 40 characters' });
  }
  if (req.body.email && req.body.email.length >= 5 && req.body.email.length <= 40) {
    return res.status(400).json({ msg: 'First name should be beetween 2 and 40 characters' });
  }
  if (req.body.password && req.body.password.length >= 8 && req.body.password.length <= 16) {
    return res.status(400).json({ msg: 'First name should be beetween 2 and 40 characters' });
  }
  return next();
};

module.exports = {
  isNotEmpty,
  validateFormat,
  validateLength,
};
