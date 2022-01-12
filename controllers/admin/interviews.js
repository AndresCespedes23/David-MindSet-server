const Interviews = require('../../models/Interviews');
const { getCurrentWeekCandidate, getAvailableDatesCandidate } = require('../../helpers');

const notFoundTxt = 'Interview not found by';

const getAll = (req, res) => {
  Interviews.find()
    .populate('idCompany', 'name')
    .populate('idCandidate', 'firstName lastName')
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json({ msg: `Error: ${err}`, error: true }));
};

const getById = (req, res) => {
  const { id } = req.params;
  Interviews.findById(id)
    .populate('idCompany', 'name')
    .populate('idCandidate', 'firstName lastName')
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `${notFoundTxt} ID: ${id}`, error: true });
      return res.status(200).json(data);
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
};

const add = (req, res) => {
  const newInterview = new Interviews({
    idCompany: req.body.idCompany,
    idCandidate: req.body.idCandidate,
    date: req.body.date,
    time: req.body.time,
    status: 'Pending',
    isActive: true,
  });
  newInterview
    .save()
    .then((data) => res.status(200).json({ msg: 'Interview created', data }))
    .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
};

const edit = (req, res) => {
  const { id } = req.params;
  Interviews.findByIdAndUpdate(id, req.body, { new: true })
    .populate('idCompany', 'name')
    .populate('idCandidate', 'firstName lastName')
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `${notFoundTxt} ID: ${id}`, error: true });
      return res.status(200).json({ msg: 'Interview updated', data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
};

const remove = (req, res) => {
  const { id } = req.params;
  Interviews.findByIdAndRemove(id)
    .populate('idCompany', 'name')
    .populate('idCandidate', 'firstName lastName')
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `${notFoundTxt} ID: ${id}`, error: true });
      return res.status(200).json({ msg: 'Interview deleted', data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
};

const getAvailableInterviews = async (req, res) => {
  const { id } = req.params;
  const availableDates = await getAvailableDatesCandidate(id);
  const currentWeek = getCurrentWeekCandidate();
  return res.status(200).json({ availableDates, currentWeek });
};

module.exports = {
  getAll,
  getById,
  add,
  edit,
  remove,
  getAvailableInterviews,
};
