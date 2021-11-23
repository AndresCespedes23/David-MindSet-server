const mongoose = require('mongoose');

const isNotEmpty = (req, res, next) => {
  if (!req.body.idCandidate) {
    return res.status(400).json({ msg: 'Error 400: You must complete the id candidate' });
  }
  if (!req.body.idOpenPosition) {
    return res.status(400).json({ msg: 'Error 400: You must complete id position' });
  }
  return next();
};

const validateFormat = (req, res, next) => {
  if (req.body.idCandidate && !mongoose.Types.ObjectId.isValid(req.body.idCandidate)) {
    return res.status(400).json({ msg: 'Error 400: Invalid Candidate id' });
  }
  if (req.body.idOpenPosition && !mongoose.Types.ObjectId.isValid(req.body.idOpenPosition)) {
    return res.status(400).json({ msg: 'Error 400: Invalid Position id' });
  }
  if (req.params.id && !mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ msg: 'Error 400: Invalid id' });
  }
  return next();
};

module.exports = {
  isNotEmpty,
  validateFormat,
};
