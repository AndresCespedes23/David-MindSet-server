/* eslint-disable linebreak-style */
const mongoose = require('mongoose');

const isNotEmpty = (req, res, next) => {
  if (!req.body.idPsychologist) {
    return res.status(400).json({ msg: 'Psychologist ID is required' });
  }
  if (!req.body.idCandidate) {
    return res.status(400).json({ msg: 'Candidate ID is required' });
  }
  if (!req.body.date) {
    return res.status(400).json({ msg: 'Date is required' });
  }
  if (!req.body.time) {
    return res.status(400).json({ msg: 'Time is required' });
  }
  return next();
};

const isObjectID = (id) => mongoose.Types.ObjectId.isValid(id);

const validateLength = (req, res, next) => {
  if (!req.body.date.length === 10) {
    return res.status(400).json({ msg: 'Date should have 10 characters' });
  }
  return next();
};

const validateFormat = (req, res, next) => {
  if (req.body.idPsychologist && !mongoose.Types.ObjectId.isValid(req.body.idPsychologist)) {
    return res.status(400).json({ msg: 'Invalid psychologist id' });
  }
  if (req.body.idCandidate && !mongoose.Types.ObjectId.isValid(req.body.idCandidate)) {
    return res.status(400).json({ msg: 'Invalid candidate id' });
  }
  if (req.params.id && !mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ msg: 'Invalid id' });
  }
  return next();
};

module.exports = {
  isNotEmpty,
  isObjectID,
  validateLength,
  validateFormat,
};
