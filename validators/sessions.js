/* eslint-disable linebreak-style */
const mongoose = require('mongoose');
const { getAvailableDates } = require('../helpers/index');
const Sessions = require('../models/Sessions');

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

const sessionStillAvailable = async (req, res, next) => {
  const availableDates = await getAvailableDates();
  const { availability } = availableDates.find(
    (psychologist) => psychologist.id.toString() === req.body.idPsychologist,
  );
  console.log(
    `${req.body.date}|${new Date(req.body.date)}|${new Date(req.body.date).getDate()}|${
      req.body.time
    }`,
  );
  if (!availability)
    return res.status(400).json({
      msg: 'Session is no longer available. 1',
      info: `${req.body.date}|${new Date(req.body.date)}|${new Date(req.body.date).getDate()}|${
        req.body.time
      }`,
    });
  const sessionDay = availability.find((day) => day.number === new Date(req.body.date).getDate());
  if (!sessionDay)
    return res
      .status(400)
      .json({
        msg: 'Session is no longer available. 2',
        info: `${req.body.date}|${new Date(req.body.date)}|${new Date(req.body.date).getDate()}|${
          req.body.time
        }`,
      });
  const sessionHour = sessionDay.hours.find((hour) => hour === req.body.time);
  if (!sessionHour)
    return res
      .status(400)
      .json({
        msg: 'Session is no longer available. 3',
        info: `${req.body.date}|${new Date(req.body.date)}|${new Date(req.body.date).getDate()}|${
          req.body.time
        }`,
      });
  return next();
};

const checkForExistingSession = async (req, res, next) => {
  const existingSession = await Sessions.find({
    idCandidate: req.body.idCandidate,
    $or: [{ status: 'pending' }, { status: 'done' }, { status: 'closed' }],
  });
  if (existingSession.length) {
    return res.status(400).json({ msg: 'Candidate already has a session scheduled.' });
  }
  return next();
};

module.exports = {
  isNotEmpty,
  isObjectID,
  validateLength,
  validateFormat,
  sessionStillAvailable,
  checkForExistingSession,
};
