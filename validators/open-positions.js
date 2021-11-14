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

module.exports = {
  isNotEmpty,
  isObjectID,
};
