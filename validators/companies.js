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

const validateIdformat = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: `Invalid ID format: ${req.params.id}` });
  }
  return next();
};

const validateLength = (req, res, next) => {
  let max;
  let min;
  if (req.body.name && (min = 2) <= req.body.name.length && (max = 40) >= req.body.name.length) {
    return res.status(400).json({ msg: `name should have between ${min} and ${max} symbols` });
  }
  if (
    req.body.address &&
    (min = 2) <= req.body.address.length &&
    (max = 40) >= req.body.address.length
  ) {
    return res.status(400).json({ msg: `address should have between ${min} and ${max} symbols` });
  }
  if (req.body.city && (min = 2) <= req.body.city.length && (max = 40) >= req.body.city.length) {
    return res.status(400).json({ msg: `city should have between ${min} and ${max} symbols` });
  }
  if (
    req.body.province &&
    (min = 2) <= req.body.province.length &&
    (max = 40) >= req.body.province.length
  ) {
    return res.status(400).json({ msg: `province should have between ${min} and ${max} symbols` });
  }
  if (
    req.body.country &&
    (min = 2) <= req.body.country.length &&
    (max = 40) >= req.body.country.length
  ) {
    return res.status(400).json({ msg: `country should have between ${min} and ${max} symbols` });
  }
  if (req.body.zipCode && (min = 0) <= req.body.zipCode && (max = 100000) >= req.body.zipCode) {
    return res.status(400).json({ msg: `zipCode should be between ${min} and ${max}` });
  }
  if (req.body.phone && (min = 50) <= req.body.phone && (max = Infinity) >= req.body.phone) {
    return res.status(400).json({ msg: `phone should be between ${min} and ${max}` });
  }
  if (req.body.email && (min = 2) <= req.body.email.length && (max = 40) >= req.body.email.length) {
    return res.status(400).json({ msg: `email should have between ${min} and ${max} symbols` });
  }
  if (
    req.body.pictureUrl &&
    (min = 5) <= req.body.pictureUrl.length &&
    (max = 200) >= req.body.pictureUrl.length
  ) {
    return res
      .status(400)
      .json({ msg: `pictureUrl should have between ${min} and ${max} symbols` });
  }
  if (
    req.body.contactFullName &&
    (min = 2) <= req.body.contactFullName.length &&
    (max = 40) >= req.body.contactFullName.length
  ) {
    return res
      .status(400)
      .json({ msg: `contactFullName should have between ${min} and ${max} symbols` });
  }
  if (
    req.body.contactPhone &&
    (min = 50) <= req.body.contactPhone &&
    (max = Infinity) >= req.body.contactPhone
  ) {
    return res.status(400).json({ msg: `contactPhone should be between ${min} and ${max}` });
  }
  return next();
};

const bodyNotEmpty = (req, res, next) => {
  if (Object.keys(req.body).length === 0) return res.status(400).json({ message: 'Body empty' });
  return next();
};

const validateDataType = (req, res, next) => {
  const typeString = [
    'name',
    'address',
    'city',
    'province',
    'country',
    'email',
    'pictureUrl',
    'contactFullName',
  ];
  const typeNumber = ['zipCode', 'phone', 'contactPhone'];
  const typeBoolean = ['isActive'];
  const stringMiss = [];
  const numberMiss = [];
  const booleanMiss = [];

  for (let element = 0; element < typeString.length; element += 1) {
    if (req.body[typeString[element]]) {
      if (
        parseInt(req.body[typeString[element]]) ||
        req.body[typeString[element]] === 'false' ||
        req.body[typeString[element]] === 'true' ||
        req.body[typeString[element]].search(/^\[([^]+)]$/) !== -1 ||
        req.body[typeString[element]].search(/^\{([^]+)}$/) !== -1
      ) {
        stringMiss.push(typeString[element]);
      }
    }
  }
  for (let element = 0; element < typeNumber.length; element += 1) {
    if (req.body[typeBoolean[element]]) {
      if (!parseInt(req.body[typeNumber[element]])) {
        numberMiss.push(typeNumber[element]);
      }
    }
  }
  for (let element = 0; element < typeBoolean.length; element += 1) {
    if (req.body[typeBoolean[element]]) {
      if (req.body[typeBoolean[element]] !== 'true' && req.body[typeBoolean[element]] !== 'false') {
        booleanMiss.push(typeBoolean[element]);
      }
    }
  }
  if (stringMiss.length !== 0) {
    return res.status(400).json({ message: `${stringMiss}: types should be string` });
  }
  if (numberMiss.length !== 0) {
    return res.status(400).json({ message: `${numberMiss}: types should be number` });
  }
  if (booleanMiss.length !== 0) {
    return res.status(400).json({ message: `${booleanMiss}: types should be boolean` });
  }
  return next();
};

module.exports = {
  required,
  requiredCompanies,
  validateIdformat,
  checkLength,
  validateLength,
  bodyNotEmpty,
  validateDataType,
};
