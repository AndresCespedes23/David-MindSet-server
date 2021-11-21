const Applications = require('../models/Applications');

const notFoundTxt = 'Application not found by';

const getAll = (req, res) => {
  Applications.find()
    .populate('idCandidate', 'firstName lastName')
    .populate('idOpenPosition', 'jobDescription')
    .then((applications) => res.json({ applications }))
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const getById = (req, res) => {
  const { id } = req.params;
  Applications.findById(id)
    .populate('idCandidate', 'firstName lastName')
    .populate('idOpenPosition', 'jobDescription')
    .then((application) => {
      if (!application) return res.status(404).json({ msg: `${notFoundTxt} ID: ${id}` });
      return res.json({ application });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const search = (req, res) => {
  const queryParam = req.query;
  const idOpenPosition = queryParam.idOpenPosition || null;
  if (!idOpenPosition) return res.status(400).json({ msg: 'Missing query param: Position' });
  return Applications.find({ idOpenPosition })
    .populate('idCandidate', 'firstName lastName')
    .populate('idOpenPosition', 'jobDescription')
    .then((application) => {
      if (application.length === 0) {
        return res.status(404).json({ msg: `Position not found ID: ${idOpenPosition}` });
      }
      return res.json({ application });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const add = (req, res) => {
  const newApplication = new Applications({
    idOpenPosition: req.body.idOpenPosition,
    idCandidate: req.body.idCandidate,
    isActive: true,
  });
  newApplication
    .save()
    .then((application) => res.json({ success: 'Application added successfully', application }))
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const edit = (req, res) => {
  const { id } = req.params;
  Applications.findByIdAndUpdate(id, req.body, { new: true })
    .then((application) => {
      if (!application) return res.status(404).json({ msg: `${notFoundTxt} ID: ${id}` });
      return res.json({ success: 'Application edited successfully', application });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const remove = (req, res) => {
  const { id } = req.params;
  Applications.findByIdAndRemove(id)
    .then((application) => {
      if (!application) return res.status(404).json({ msg: `${notFoundTxt} ID: ${id}` });
      return res.json({ success: 'Application removed successfully', application });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

module.exports = {
  getAll,
  search,
  add,
  edit,
  remove,
  getById,
};
