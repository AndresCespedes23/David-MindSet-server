/* eslint-disable max-len */
const mongoose = require('mongoose');

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
  return next();
};

const validateFormat = (req, res, next) => {
  if (req.params.id !== undefined) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ msg: 'No MongoDB ID' });
    }
  }
  if (req.body.firstName !== undefined) {
    if (!(typeof req.body.firstName === 'string')) {
      return res.status(400).json({ msg: 'First Name must be string' });
    }
  }
  if (req.body.lastName !== undefined) {
    if (!(typeof req.body.lastName === 'string')) {
      return res.status(400).json({ msg: 'Last Name must be string' });
    }
  }
  if (req.body.email !== undefined) {
    if (!(req.body.email.split('').indexOf('@') !== -1 && req.body.email.split('').indexOf('.') !== -1)) {
      return res.status(400).json({ msg: 'Email must be an email format' });
    }
  }
  return next();
};

const validateLength = (req, res, next) => {
  if (req.body.firstName !== undefined) {
    if (!(req.body.firstName.length >= 2 && req.body.firstName.length <= 40)) {
      return res.status(400).json({ msg: 'First Name must be between 2 and 40 characters' });
    }
  }
  if (req.body.lastName !== undefined) {
    if (!(req.body.lastName.length >= 2 && req.body.lastName.length <= 40)) {
      return res.status(400).json({ msg: 'Last Name must be between 2 and 40 characters' });
    }
  }
  if (req.body.email !== undefined) {
    if (!(req.body.email.length >= 5 && req.body.email.length <= 50)) {
      return res.status(400).json({ msg: 'Email must be between 2 and 50 characters' });
    }
  }
  return next();
};

const validateTimeRange = (req, res, next) => {
  const { timeRange } = req.body;
  if (timeRange?.monday && validateTime(timeRange?.monday?.from, timeRange?.monday?.to))
    return res.status(400).json({ msg: `TimeRange Monday: ${validateTime(timeRange.monday?.from, timeRange.monday?.to)}` });
  if (timeRange?.tuesday && validateTime(timeRange?.tuesday?.from, timeRange?.tuesday?.to))
    return res.status(400).json({ msg: `TimeRange Tuesday: ${validateTime(timeRange.tue?.from, timeRange.tuesday?.to)}` });
  if (timeRange?.wednesday && validateTime(timeRange?.wednesday?.from, timeRange?.wednesday?.to))
    return res.status(400).json({ msg: `TimeRange Wednesday: ${validateTime(timeRange.wednesday?.from, timeRange.wednesday?.to)}` });
  if (timeRange?.thursday && validateTime(timeRange?.thursday?.from, timeRange?.thursday?.to))
    return res.status(400).json({ msg: `TimeRange Thursday: ${validateTime(timeRange.thursday?.from, timeRange.thursday?.to)}` });
  if (timeRange?.friday && validateTime(timeRange?.friday?.from, timeRange?.friday?.to))
    return res.status(400).json({ msg: `TimeRange Friday: ${validateTime(timeRange.friday?.from, timeRange.friday?.to)}` });
  next();
};

module.exports = {
  isNotEmpty,
  validateFormat,
  validateLength,
  validateTimeRange,
};

// eslint-disable-next-line consistent-return
const validateTime = (from, to) => {
  if ((!from && to) || (from && !to)) return 'Must complete the both fields';
  if (from % 1 !== 0) return 'Since hour must be a whole number';
  if (to % 1 !== 0) return 'Until hour must be a whole number';
  if (from > 23 || from < 0) return 'Since Hour must be between 0 and 23';
  if (to > 24 || to < 1) return 'Until Hour must be between 1 and 24';
  if (from >= to) return 'End must to be later than Start';
};
