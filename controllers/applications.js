const Applications = require('../models/Applications');

const notFoundTxt = 'Application not found by';

const getAll = (req, res) => {
  Applications.find()
    .populate('idCandidate', 'firstName lastName')
    .populate('idOpenPosition', 'jobDescription')
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
};

const getById = (req, res) => {
  const { id } = req.params;
  Applications.findById(id)
    .populate('idCandidate', 'firstName lastName')
    .populate('idOpenPosition', 'jobDescription')
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `${notFoundTxt} ID: ${id}`, error: true });
      return res.status(200).json(data);
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
};

const search = (req, res) => {
  const queryParam = req.query;
  const idOpenPosition = queryParam.idOpenPosition || null;
  if (!idOpenPosition) return res.status(400).json({ msg: 'Missing query param: Position', error: true });
  return Applications.find({ idOpenPosition })
    .populate('idCandidate', 'firstName lastName')
    .populate('idOpenPosition', 'jobDescription')
    .then((data) => {
      if (data.length === 0) {
        return res.status(404).json({ msg: `Position not found ID: ${idOpenPosition}`, error: true });
      }
      return res.status(200).json(data);
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
};

const add = (req, res) => {
  const newApplication = new Applications({
    idOpenPosition: req.body.idOpenPosition,
    idCandidate: req.body.idCandidate,
    status: true,
    isActive: true,
  });
  newApplication
    .save()
    .then((data) => res.status(201).json({ msg: 'Application created', data }))
    .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
};

const edit = (req, res) => {
  const { id } = req.params;
  Applications.findByIdAndUpdate(id, req.body, { new: true })
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `${notFoundTxt} ID: ${id}`, error: true });
      return res.status(200).json({ msg: 'Application updated', data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
};

const remove = (req, res) => {
  const { id } = req.params;
  Applications.findByIdAndRemove(id)
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `${notFoundTxt} ID: ${id}`, error: true });
      return res.status(200).json({ msg: 'Application deleted', data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
};

module.exports = {
  getAll,
  search,
  add,
  edit,
  remove,
  getById,
};
