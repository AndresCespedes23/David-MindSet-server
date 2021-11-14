const Applications = require('../models/Applications');

const notFoundTxt = 'Application not found by';

const getAll = (req, res) => {
  Applications.find()
    .then((applications) => res.json({ applications }))
    .catch((err) => res.status(500).json(err));
};

const getById = (req, res) => {
  const { id } = req.params;
  Applications.findById(id)
    .then((data) => {
      if (!data) {
        return res.status(404).json({ msg: `${notFoundTxt} ID: ${id}` });
      }
      return res.json({ data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const search = (req, res) => {
  const queryParam = req.query;
  const idOpenPosition = queryParam.openPosition || null;
  if (!idOpenPosition) return res.status(400).json({ msg: 'Missing query param: Position' });
  return Applications.find({ idOpenPosition })
    .then((data) => {
      if (data.length === 0) {
        return res.status(404).json({ msg: `Position not found by ID: ${idOpenPosition}` });
      }
      return res.json({ data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const getByCandidate = (req, res) => {
  const { id } = req.params;
  Applications.find({ idCandidate: id })
    .then((data) => {
      if (data.length === 0) {
        return res.status(404).json({ msg: `Candidate not found by ID: ${id}` });
      }
      return res.json({ data });
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
    .then((data) => res.json({ msg: 'Application added', data }))
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const edit = (req, res) => {
  const { id } = req.params;
  Applications.findByIdAndUpdate(id, req.body, { new: true })
    .then((data) => {
      if (!data) {
        return res.status(404).json({ msg: `${notFoundTxt} ID: ${id}` });
      }
      return res.json({ msg: 'Appication updated', data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const remove = (req, res) => {
  const { id } = req.params;
  Applications.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        return res.status(404).json({ msg: `${notFoundTxt} ID: ${id}` });
      }
      return res.json({ msg: 'Application removed', data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

module.exports = {
  getAll,
  search,
  getByCandidate,
  add,
  edit,
  remove,
  getById,
};
