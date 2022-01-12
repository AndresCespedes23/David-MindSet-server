const mongoose = require('mongoose');

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

// const interviewStillAvailable = async (req, res, next) => {
//   const availableDates = await getAvailableDates();
//   const { availability } = availableDates.find(
//     (psychologist) => psychologist.id.toString() === req.body.idPsychologist,
//   );
//   if (!availability) return res.status(400).json({ msg: 'Session is no longer available.' });
//   const sessionDay = availability.find(
//     (day) => day.number === new Date(req.body.date).getDate() + 1,
//   );
//   if (!sessionDay) return res.status(400).json({ msg: 'Session is no longer available.' });
//   const sessionHour = sessionDay.hours.find((hour) => hour === req.body.time);
//   if (!sessionHour) return res.status(400).json({ msg: 'Session is no longer available.' });
//   return next();
// };

module.exports = {
  isNotEmpty,
  validateFormat,
};
