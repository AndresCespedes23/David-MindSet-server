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

const validateFormat = (req, res, next) => {
  if (req.body.idCompany && !mongoose.Types.ObjectId.isValid(req.body.idCompany)) {
    return res.status(400).json({ msg: 'Invalid company id' });
  }
  if (req.query.company && !mongoose.Types.ObjectId.isValid(req.query.company)) {
    return res.status(400).json({ msg: 'Invalid company id' });
  }
  if (req.params.id && !mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ msg: 'Invalid id' });
  }
  return next();
};

const validateLength = (req, res, next) => {
  if (req.body.startDate && req.body.startDate.length !== 10) {
    return res.status(400).json({ msg: 'Start date should have 10 characters' });
  }
  if (req.body.endDate && req.body.endDate.length !== 10) {
    return res.status(400).json({ msg: 'End date should have 10 characters' });
  }
  if ((req.body.jobDescription
    && req.body.jobDescription.length < 10)
    || req.body.jobDescription.length > 500) {
    return res.status(400).json({ msg: 'Job description must be between 10 and 500 characters' });
  }
  return next();
};

module.exports = {
  isNotEmpty,
  validateLength,
  validateFormat,
};
