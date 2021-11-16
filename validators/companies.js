const mongoose = require('mongoose');

const required = (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).json({ msg: 'Name is required' });
  }
  if (!req.body.address) {
    return res.status(400).json({ msg: 'address is required' });
  }
  if (!req.body.email) {
    return res.status(400).json({ msg: 'Email is required' });
  }
  if (!req.body.city) {
    return res.status(400).json({ msg: 'city is required' });
  }
  if (!req.body.province) {
    return res.status(400).json({ msg: 'province is required' });
  }
  if (!req.body.country) {
    return res.status(400).json({ msg: 'country is required' });
  }
  if (!req.body.zipCode) {
    return res.status(400).json({ msg: 'zipCode is required' });
  }
  if (!req.body.phone) {
    return res.status(400).json({ msg: 'phone is required' });
  }
  if (!req.body.contactFullName) {
    return res.status(400).json({ msg: 'contactFullName is required' });
  }
  if (!req.body.contactPhone) {
    return res.status(400).json({ msg: 'contactPhone is required' });
  }
  return next();
};

const validateLength = (req, res, next) => {
  if (req.params.id && !mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ msg: 'No MongoDB ID' });
  }
  if (req.body.name && (req.body.name.length < 2 || req.body.name.length > 40)) {
    return res.status(400).json({ msg: 'name must be between 2 and 40 characters' });
  }
  if (req.body.address && (req.body.address.length < 2 || req.body.address.length > 40)) {
    return res.status(400).json({ msg: 'address must be between 2 and 40 characters' });
  }
  if (req.body.email && (req.body.email.length < 2 || req.body.email.length > 40)) {
    return res.status(400).json({ msg: 'email must be between 2 and 40 characters' });
  }
  if (req.body.city && (req.body.city.length < 2 || req.body.city.length > 40)) {
    return res.status(400).json({ msg: 'city must be between 2 and 40 characters' });
  }
  if (req.body.province && (req.body.province.length < 2 || req.body.province.length > 40)) {
    return res.status(400).json({ msg: 'province must be between 2 and 40 characters' });
  }
  if (req.body.country && (req.body.country.length < 2 || req.body.country.length > 40)) {
    return res.status(400).json({ msg: 'country must be between 2 and 40 characters' });
  }
  if (
    req.body.contactFullName &&
    (req.body.contactFullName.length < 2 || req.body.contactFullName.length > 40)
  ) {
    return res.status(400).json({ msg: 'contactFullName must be between 2 and 40 characters' });
  }
  if (req.body.contactPhone && req.body.contactPhone < 0) {
    return res.status(400).json({ msg: 'contactPhone must be greater than 0' });
  }
  if (req.body.phone && req.body.phone < 0) {
    return res.status(400).json({ msg: 'phone must be greater than 0' });
  }
  if (req.body.pictureUrl && (req.body.pictureUrl.length < 5 || req.body.pictureUrl.length > 100)) {
    return res.status(400).json({ msg: 'pictureUrl must be between 5 and 100 characters' });
  }
  if (req.body.zipCode && (req.body.zipCode.length < 0 || req.body.zipCode.length > 100000)) {
    return res.status(400).json({ msg: 'zipCode must be between 0 and 10000' });
  }
  return next();
};

const bodyNotEmpty = (req, res, next) => {
  if (Object.keys(req.body).length === 0) return res.status(400).json({ message: 'Body empty' });
  return next();
};

const validateDataTypeAndFormat = (req, res, next) => {
  if (req.params.id) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'No MongoDB ID' });
    }
  }
  if (req.body.name && typeof req.body.name !== 'string') {
    return res.status(400).json({ message: 'Name must be string' });
  }
  if (req.body.address && typeof req.body.address !== 'string') {
    return res.status(400).json({ message: 'Address must be string' });
  }
  if (req.body.email) {
    if (
      !(
        req.body.email.split('').indexOf('@') !== -1 && req.body.email.split('').indexOf('.') !== -1
      )
    ) {
      return res.status(400).json({ message: 'Email must be an email format' });
    }
  }
  if (req.body.password && typeof req.body.password !== 'string') {
    return res.status(400).json({ message: 'Password must be string' });
  }
  if (req.body.city && typeof req.body.city !== 'string') {
    return res.status(400).json({ message: 'City Name must be string' });
  }
  if (req.body.province && typeof req.body.province !== 'string') {
    return res.status(400).json({ message: 'Province must be string' });
  }
  if (req.body.country && typeof req.body.country !== 'string') {
    return res.status(400).json({ message: 'Country must be string' });
  }
  if (req.body.zipCode && typeof req.body.zipCode !== 'number') {
    return res.status(400).json({ message: 'Zip code must be number' });
  }
  if (req.body.phone && typeof req.body.phone !== 'number') {
    return res.status(400).json({ message: 'Phone must be number' });
  }
  if (req.body.pictureUrl && typeof req.body.pictureUrl !== 'string') {
    return res.status(400).json({ message: 'Picture url must be string' });
  }
  if (req.body.contactFullName && typeof req.body.contactFullName !== 'string') {
    return res.status(400).json({ message: 'Contact full name must be string' });
  }
  if (req.body.contactPhone && typeof req.body.contactPhone !== 'number') {
    return res.status(400).json({ message: 'Contact phone must be number' });
  }
  return next();
};

module.exports = {
  required,
  validateDataTypeAndFormat,
  validateLength,
  bodyNotEmpty,
};
