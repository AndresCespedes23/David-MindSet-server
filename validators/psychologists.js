const mongoose = require('mongoose');

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
  return next();
};

const validateFormat = (req, res, next) => {
  if (req.params.id !== undefined) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ msg: 'No MongoDB ID' });
    }
  }
  if (req.body.firstName !== undefined) {
    if (!(typeof req.body.firstName === 'string')) {
      return res.status(400).json({ msg: 'First Name must be string' });
    }
  }
  if (req.body.lastName !== undefined) {
    if (!(typeof req.body.lastName === 'string')) {
      return res.status(400).json({ msg: 'Last Name must be string' });
    }
  }
  if (req.body.email !== undefined) {
    if (!(req.body.email.split('').indexOf('@') !== -1 && req.body.email.split('').indexOf('.') !== -1)) {
      return res.status(400).json({ msg: 'Email must be an email format' });
    }
  }
  return next();
};

const validateLength = (req, res, next) => {
  if (req.body.firstName !== undefined) {
    if (!(req.body.firstName.length >= 2 && req.body.firstName.length <= 40)) {
      return res.status(400).json({ msg: 'First Name must be between 2 and 40 characters' });
    }
  }
  if (req.body.lastName !== undefined) {
    if (!(req.body.lastName.length >= 2 && req.body.lastName.length <= 40)) {
      return res.status(400).json({ msg: 'Last Name must be between 2 and 40 characters' });
    }
  }
  if (req.body.email !== undefined) {
    if (!(req.body.email.length >= 5 && req.body.email.length <= 50)) {
      return res.status(400).json({ msg: 'Email must be between 2 and 50 characters' });
    }
  }
  return next();
};

module.exports = {
  isNotEmpty,
  validateFormat,
  validateLength,
};
