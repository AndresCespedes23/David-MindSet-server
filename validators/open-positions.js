const mongoose = require('mongoose');

const isNotEmpty = (req, res, next) => {
  if (!req.body.idCompany) {
    return res.status(400).json({ msg: 'You must complete the id company' });
  }
  if (!req.body.startDate) {
    return res.status(400).json({ msg: 'You must complete the start date' });
  }
  if (!req.body.jobDescription) {
    return res.status(400).json({ msg: 'You must complete the job description' });
  }
  return next();
};

const isObjectID = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
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
  if (!checkLength(req.body.startDate, 10, 10)) {
    return res.status(400).json({ msg: 'Start date should have 10 characters' });
  }
  if (!checkLength(req.body.jobDescription, 10, 500)) {
    return res.status(400).json({ msg: 'Job description must be between 10 and 500 characters' });
  }
  return next();
};

module.exports = {
  isNotEmpty,
  isObjectID,
  validateLength,
};
