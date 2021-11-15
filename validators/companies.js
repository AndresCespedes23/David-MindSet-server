/* eslint-disable no-bitwise */
/* eslint-disable no-cond-assign */
/* eslint-disable no-restricted-syntax */
const mongoose = require('mongoose');

function requiredCompanies(req, res, next) {
  res.locals.requirements = {};
  res.locals.requirements.name = 'name';
  res.locals.requirements.address = 'address';
  res.locals.requirements.city = 'city';
  res.locals.requirements.province = 'province';
  res.locals.requirements.country = 'country';
  res.locals.requirements.zipCode = 'zipCode';
  res.locals.requirements.phone = 'phone';
  res.locals.requirements.email = 'email';
  res.locals.requirements.contactFullName = 'contactFullName';
  res.locals.requirements.contactPhone = 'contactPhone';
  return next();
}

const required = (req, res, next) => {
  const missingParameters = [];
  for (const requiredElement in res.locals.requirements) {
    // res.locals doesnt have a prototype
    if (!req.body[requiredElement]) {
      missingParameters.push(requiredElement);
    }
  }
  if (missingParameters.length === 0) return next();
  return res.status(400).json({ message: `Missing parameters: ${missingParameters}` });
};

const validateLength = (req, res, next) => {
  let max;
  let min;
  const stringError = (minimum, maximum) => `must be between ${minimum} and ${maximum}`;
  if ((req.body.name && (min = 2) >= req.body.name.length) | ((max = 60) <= req.body.name.length)) {
    return res.status(400).json({ message: `name ${stringError(min, max)} symbols` });
  }
  if (
    req.body.address &&
    ((min = 2) >= req.body.address.length) | ((max = 60) <= req.body.address.length)
  ) {
    return res.status(400).json({ message: `address ${stringError(min, max)} symbols` });
  }
  if (req.body.city && ((min = 2) >= req.body.city.length) | ((max = 60) <= req.body.city.length)) {
    return res.status(400).json({ message: `city ${stringError(min, max)} symbols` });
  }
  if (
    req.body.province &&
    ((min = 2) >= req.body.province.length) | ((max = 60) <= req.body.province.length)
  ) {
    return res.status(400).json({ message: `province ${stringError(min, max)} symbols` });
  }
  if (
    req.body.country &&
    ((min = 2) >= req.body.country.length) | ((max = 60) <= req.body.country.length)
  ) {
    return res.status(400).json({ message: `country ${stringError(min, max)} symbols` });
  }
  if (req.body.zipCode && ((min = 0) >= req.body.zipCode) | ((max = 100000) <= req.body.zipCode)) {
    return res.status(400).json({ message: `zipCode ${stringError(min, max)}` });
  }
  if (req.body.phone && ((min = 50) >= req.body.phone) | ((max = Infinity) <= req.body.phone)) {
    return res.status(400).json({ message: `phone ${stringError(min, max)} symbols` });
  }
  if (
    req.body.email &&
    ((min = 2) >= req.body.email.length) | ((max = 60) <= req.body.email.length)
  ) {
    return res.status(400).json({ message: `email ${stringError(min, max)} symbols` });
  }
  if (
    req.body.pictureUrl &&
    ((min = 5) >= req.body.pictureUrl.length) | ((max = 200) <= req.body.pictureUrl.length)
  ) {
    return res.status(400).json({ message: `pictureUrl ${stringError(min, max)} symbols` });
  }
  if (
    req.body.contactFullName &&
    ((min = 2) >= req.body.contactFullName.length) | ((max = 60) <= req.body.contactFullName.length)
  ) {
    return res.status(400).json({ message: `contactFullName ${stringError(min, max)} symbols` });
  }
  if (
    req.body.contactPhone &&
    ((min = 50) >= req.body.contactPhone) | ((max = Infinity) <= req.body.contactPhone)
  ) {
    return res.status(400).json({ message: `contactPhone ${stringError(min, max)}` });
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
  requiredCompanies,
  validateDataTypeAndFormat,
  validateLength,
  bodyNotEmpty,
};
