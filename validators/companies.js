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

const checkLength = (word, minLength, maxLength) => {
  if (minLength <= word.length && word.length <= maxLength) {
    return true;
  }
  return false;
};

const checkNumberSize = (number, min, max) => {
  if (min <= number && number <= max) {
    return true;
  }
  return false;
};

const validateLength = (req, res, next) => {
  let max;
  let min;
  if (req.body.name && !checkLength(req.body.name, (min = 2), (max = 40))) {
    return res.status(400).json({ msg: `name should have between ${min} and ${max} symbols` });
  }
  if (req.body.address && !checkLength(req.body.address, (min = 2), (max = 100))) {
    return res.status(400).json({ msg: `address should have between ${min} and ${max} symbols` });
  }
  if (req.body.city && !checkLength(req.body.city, (min = 2), (max = 40))) {
    return res.status(400).json({ msg: `city should have between ${min} and ${max} symbols` });
  }
  if (req.body.province && !checkLength(req.body.province, (min = 2), (max = 40))) {
    return res.status(400).json({ msg: `province should have between ${min} and ${max} symbols` });
  }
  if (req.body.country && !checkLength(req.body.country, (min = 2), (max = 40))) {
    return res.status(400).json({ msg: `country should have between ${min} and ${max} symbols` });
  }
  if (req.body.zipCode && !checkNumberSize(req.body.zipCode, (min = 0), (max = 10000))) {
    return res.status(400).json({ msg: `zipCode should be between ${min} and ${max}` });
  }
  if (req.body.phone && !checkNumberSize(req.body.phone, (min = 50), (max = Infinity))) {
    return res.status(400).json({ msg: `phone should be between ${min} and ${max}` });
  }
  if (req.body.email && !checkLength(req.body.email, (min = 5), (max = 40))) {
    return res.status(400).json({ msg: `email should have between ${min} and ${max} symbols` });
  }
  if (req.body.pictureUrl && !checkLength(req.body.pictureUrl, (min = 5), (max = 200))) {
    return res
      .status(400)
      .json({ msg: `pictureUrl should have between ${min} and ${max} symbols` });
  }
  if (req.body.contactFullName && !checkLength(req.body.contactFullName, (min = 2), (max = 40))) {
    return res
      .status(400)
      .json({ msg: `contactFullName should have between ${min} and ${max} symbols` });
  }
  if (
    req.body.contactPhone &&
    !checkNumberSize(req.body.contactPhone, (min = 50), (max = Infinity))
  ) {
    return res.status(400).json({ msg: `contactPhone should be between ${min} and ${max}` });
  }
  if (req.body.isActive && !checkLength(req.body.isActive, (min = 4), (max = 5))) {
    return res.status(400).json({ msg: `isActive should have between ${min} and ${max} symbols` });
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
