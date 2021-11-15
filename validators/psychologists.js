const mongoose = require('mongoose');

const isObjectID = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.log(mongoose.Types.ObjectId.isValid(id));
    return res.status(400).json({ msg: 'No MongoDB ID' });
  }
  return next();
};

const isNotEmpty = (req, res, next) => {
  if (!req.body.firstName) {
    return res.status(400).json({ msg: 'First Name is required' });
  }
  if (!req.body.lastName) {
    return res.status(400).json({ msg: 'Last Name is required' });
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
  if (!typeof (req.body.firstName) === 'string') {
    return res.status(400).json({ msg: 'First Name must be string' });
  }
  if (!typeof (req.body.lastName) === 'string') {
    return res.status(400).json({ msg: 'Last Name must be string' });
  }
  if (!(req.body.email.split('').indexOf('@') !== -1 && req.body.email.split('').indexOf('.') !== -1)) {
    return res.status(400).json({ msg: 'Email must be an email format' });
  }
  if (!typeof (req.body.password) === 'string') {
    return res.status(400).json({ msg: 'Password must be string' });
  }
  return next();
};

const validateLength = (req, res, next) => {
  if (!(req.body.firstName.length >= 2 && req.body.firstName.length <= 40)) {
    return res.status(400).json({ msg: 'First Name must be between 2 and 40 characters' });
  }
  if (!(req.body.lastName.length >= 2 && req.body.lastName.length <= 40)) {
    return res.status(400).json({ msg: 'Last Name must be between 2 and 40 characters' });
  }
  if (!(req.body.email.length >= 5 && req.body.email.length <= 50)) {
    return res.status(400).json({ msg: 'Email must be between 2 and 50 characters' });
  }
  if (!(req.body.password.length >= 8 && req.body.password.length <= 16)) {
    return res.status(400).json({ msg: 'Password must be between 8 and 16 characters' });
  }
  return next();
};

module.exports = {
  isObjectID,
  isNotEmpty,
  validateFormat,
  validateLength,
};
