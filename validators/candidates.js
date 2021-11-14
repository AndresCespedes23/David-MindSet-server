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
  if (!req.body.password) {
    return res.status(400).json({ msg: 'Password is required' });
  }
  if (!req.body.phone) {
    return res.status(400).json({ msg: 'Phone is required' });
  }
  if (!req.body.address.street) {
    return res.status(400).json({ msg: 'Full address is required' });
  }
  if (!req.body.address.number) {
    return res.status(400).json({ msg: 'Full address is required' });
  }
  if (!req.body.city) {
    return res.status(400).json({ msg: 'City is required' });
  }
  if (!req.body.province) {
    return res.status(400).json({ msg: 'Province is required' });
  }
  if (!req.body.country) {
    return res.status(400).json({ msg: 'Country is required' });
  }
  if (!req.body.postalCode) {
    return res.status(400).json({ msg: 'PostalCode is required' });
  }
  if (!req.body.birthday) {
    return res.status(400).json({ msg: 'Birthday is required' });
  }
  return next();
};

const isObjectID = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.log(mongoose.Types.ObjectId.isValid(id));
    return res.status(400).json({ msg: 'No MongoDB ID' });
  }
  return next();
};

const checkLength = (word, minLength, maxLength) => {
  if (minLength <= word.length && word.length <= maxLength) {
    return true;
  }
  return false;
};

const validateLength = (req, res, next) => {
  if (!checkLength(req.body.firstName, 2, 40)) {
    return res.status(400).json({ msg: 'First Name must be between 2 and 40 characters' });
  }
  if (!checkLength(req.body.lastName, 2, 40)) {
    return res.status(400).json({ msg: 'Last Name must be between 2 and 40 characters' });
  }
  if (!checkLength(req.body.email, 5, 40)) {
    return res.status(400).json({ msg: 'Email must be between 5 and 40 characters' });
  }
  if (!checkLength(req.body.password, 8, 16)) {
    return res.status(400).json({ msg: 'Password must be between 8 and 16 characters' });
  }
  if (!checkLength(req.body.address.street, 3, 40)) {
    return res.status(400).json({ msg: 'Street address must be between 3 and 40 characters' });
  }
  if (!checkLength(req.body.city, 3, 40)) {
    return res.status(400).json({ msg: 'CIty must be between 3 and 40 characters' });
  }
  if (!checkLength(req.body.province, 3, 40)) {
    return res.status(400).json({ msg: 'Province must be between 3 and 40 characters' });
  }
  if (!checkLength(req.body.country, 3, 40)) {
    return res.status(400).json({ msg: 'Country must be between 3 and 40 characters' });
  }
  return next();
};

module.exports = {
  isNotEmpty,
  isObjectID,
  validateLength,
};
