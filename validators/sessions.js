/* eslint-disable linebreak-style */
const mongoose = require('mongoose');

const isNotEmpty = (req, res, next) => {
  if (!req.body.idPsychologists) {
    return res.status(400).json({ msg: 'You must complete the psychologist ID' });
  }
  if (!req.body.idCandidate) {
    return res.status(400).json({ msg: 'You must complete the candidate ID' });
  }
  if (!req.body.date) {
    return res.status(400).json({ msg: 'You must complete the session date' });
  }
  return next();
};

const isObjectID = (id) => mongoose.Types.ObjectId.isValid(id);

const validateLength = (req, res, next) => {
  if (!req.body.date.lenght === 10) {
    return res.status(400).json({ msg: 'Date should have 10 characters' });
  }
  return next();
};

const validateFormat = (req, res, next) => {
  if (req.body.idPsychologists && !mongoose.Types.ObjectId.isValid(req.body.idPsychologists)) {
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
