const mongoose = require('mongoose');

const isNotEmpty = (req, res, next) => {
  if (!req.body.idCompany) {
    return res.status(400).json({ msg: 'You must complete the id company' });
  }
  if (!req.body.idCandidate) {
    return res.status(400).json({ msg: 'You must complete the id company' });
  }
  if (!req.body.date) {
    return res.status(400).json({ msg: 'You must complete the start date' });
  }
  return next();
};

const validateFormat = (req, res, next) => {
  if (req.query.id && !mongoose.Types.ObjectId.isValid(req.query.id)) {
    return res.status(400).json({ msg: 'Invalid id' });
  }
  if (req.query.idCompany && !mongoose.Types.ObjectId.isValid(req.query.idCompany)) {
    return res.status(400).json({ msg: 'Invalid company id' });
  }
  if (req.query.idCandidate && !mongoose.Types.ObjectId.isValid(req.query.idCandidate)) {
    return res.status(400).json({ msg: 'Invalid candidate id' });
  }
  return next();
};

module.exports = {
  isNotEmpty,
  validateFormat,
};
