const Sessions = require('../../models/Sessions');
const Psychologists = require('../../models/Psychologists');
const { checkEmptyTimeRange, getAvailability } = require('../../helpers');

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

const getAvailableDates = (req, res) => {
  const availableDates = [];
  Psychologists.find().then((psychologists) => {
    psychologists.forEach((psychologist) => {
      if (checkEmptyTimeRange(psychologist.timeRange)) {
        const element = {
          id: psychologist._id,
          name: `${psychologist.firstName} ${psychologist.lastName}`,
          availability: getAvailability(psychologist.timeRange),
        };
        availableDates.push(element);
      }
    });
    res.json(availableDates);
  });
};

module.exports = {
  add,
  getById,
  edit,
  remove,
  getAvailableDates,
};
