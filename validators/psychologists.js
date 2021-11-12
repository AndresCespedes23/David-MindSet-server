const mongoose = require('mongoose');

// This is for all
const isObjectID = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.log(mongoose.Types.ObjectId.isValid(id));
    return res.status(400).json({ msg: 'No MongoDB ID' });
  }
  return next();
};
const isNotEmpty = (req, res, next) => {
  if (!req.body.firstName) {
    return res.status(400).json({ msg: 'First Name is required' });
  }
  if (!req.body.lastName) {
    return res.status(400).json({ msg: 'Last Name is required' });
  }
  if (!req.body.email) {
    return res.status(400).json({ msg: 'Email is required' });
  }
  if (!req.body.password) {
    return res.status(400).json({ msg: 'Password is required' });
  }
  return next();
};
module.exports = {
  isObjectID,
  isNotEmpty,
};
