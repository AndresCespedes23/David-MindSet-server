const Sessions = require('../../models/Sessions');
const Psychologists = require('../../models/Psychologists');
const { checkEmptyTimeRange, getAvailability, getCurrentWeek } = require('../../helpers');
const { weekDays } = require('../../helpers');

const notFoundTxt = 'Session not found with ID:';

const getById = (req, res) => {
  const { id } = req.params;
  Sessions.findById(id)
    .populate('idPsychologist', 'firstName lastName')
    .populate('idCandidate', 'firstName lastName')
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `${notFoundTxt} ${id}`, error: true });
      return res.status(200).json(data);
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
};

const add = (req, res) => {
  const newSession = new Sessions({
    idPsychologist: req.body.idPsychologist,
    idCandidate: req.body.idCandidate,
    date: req.body.date,
    time: req.body.time,
    status: 'pending',
    isActive: true,
  });
  newSession
    .save()
    .then((data) => res.status(201).json({ msg: 'Session created', data }))
    .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
};

const edit = (req, res) => {
  const { id } = req.params;
  Sessions.findByIdAndUpdate(id, req.body, { new: true })
    .populate('idPsychologist', 'firstName lastName')
    .populate('idCandidate', 'firstName lastName')
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `${notFoundTxt} ${id}`, error: true });
      return res.status(200).json({ msg: 'Session updated', data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
};

const remove = (req, res) => {
  const { id } = req.params;
  Sessions.findByIdAndDelete(id)
    .populate('idPsychologist', 'firstName lastName')
    .populate('idCandidate', 'firstName lastName')
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `${notFoundTxt} ${id}`, error: true });
      return res.status(200).json({ msg: 'Session deleted', data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
};

const getAvailableDates = async (req, res) => {
  const availableDates = [];
  const currentWeek = getCurrentWeek();
  const psychologists = await Psychologists.find();
  await Promise.all(
    psychologists.map(async (psychologist) => {
      if (checkEmptyTimeRange(psychologist.timeRange)) {
        const availableTimeRange = getAvailability(psychologist.timeRange);
        const availability = [];
        const sessions = await Sessions.find({
          idPsychologist: psychologist._id,
          status: 'pending',
        });
        currentWeek.forEach((day) => {
          const existingSessions = sessions.filter(
            (session) => weekDays[session.date.getDay()] === day.day,
          );
          let availableHours = availableTimeRange[day.day];
          existingSessions.forEach((session) => {
            availableHours = availableHours.filter((hour) => hour !== session.time);
          });
          availability.push({ day: day.day, number: day.number, hours: availableHours });
        });
        const element = {
          id: psychologist._id,
          name: `${psychologist.firstName} ${psychologist.lastName}`,
          availability,
        };
        availableDates.push(element);
      }
    }),
  );
  res.status(200).json({ availableDates, currentWeek });
};

module.exports = {
  add,
  getById,
  edit,
  remove,
  getAvailableDates,
};
