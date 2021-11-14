const mongoose = require('mongoose');

const isNotEmpy = (req, res, next) => {
  if (!req.body.firstName) {
    return res.status(400).json({ msg: 'First name is required'});
  }
  if (!req.body.lastName) {
    return res.status(400).json({ msg: 'First name is required'});
  }
  if (!req.body.email) {
    return res.status(400).json({ msg: 'First name is required'});
  }
  if (!req.body.password) {
    return res.status(400).json({ msg: 'First name is required'});
  }
  return next();
};

module.exports = {
    isNotEmpty,
};
