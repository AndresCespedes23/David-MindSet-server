const mongoose = require('mongoose');
const { getAvailableDatesCandidate } = require('../helpers');
const OpenPositions = require('../models/OpenPosition');

const notFoundTxt = 'OpenPosition not found by';

const isNotEmpty = (req, res, next) => {
  if (!req.body.idCompany) {
    return res.status(400).json({ msg: 'You must complete the id company' });
  }
  if (!req.body.idCandidate) {
    return res.status(400).json({ msg: 'You must complete the id company' });
  }
  if (!req.body.date) {
    return res.status(400).json({ msg: 'You must complete the date' });
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

const interviewStillAvailable = async (req, res, next) => {
  const availableDates = await getAvailableDatesCandidate(req.body.idCandidate);
  const { availability } = availableDates.find(
    (candidate) => candidate.id.toString() === req.body.idCandidate,
  );
  if (!availability) return res.status(400).json({ msg: 'Interview is no longer available.' });
  const interviewDay = availability.find(
    (day) => day.number === new Date(req.body.date).getDate() + 1,
  );
  if (!interviewDay) return res.status(400).json({ msg: 'Interview is no longer available.' });
  const interviewHour = interviewDay.hours.find((hour) => hour === req.body.time);
  if (!interviewHour) return res.status(400).json({ msg: 'Interview is no longer available.' });
  return next();
};

const interviewBetweenDates = async (req, res, next) => {
  const openPosition = await OpenPositions.findById(req.body.idOpenPosition);
  if (!openPosition) return res.status(404).json({ msg: `${notFoundTxt} ID: ${req.body.idOpenPosition}`, error: true });
  const { startDate } = openPosition;
  const { endDate } = openPosition;
  const interviewDate = new Date(req.body.date);
  if (interviewDate < startDate || interviewDate > endDate) return res.status(400).json({ msg: 'Open Position is not longer available this day.' });
  return next();
};

module.exports = {
  isNotEmpty,
  validateFormat,
  interviewStillAvailable,
  interviewBetweenDates,
};
