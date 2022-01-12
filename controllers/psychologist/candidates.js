const Candidates = require('../../models/Candidates');

const notFoundText = 'Candidate not found by';

const getAll = (req, res) => {
  Candidates.find().populate('profileTypes', 'name')
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(500).json({ msg: `Error: ${error}`, error: true }));
};

const getById = (req, res) => {
  const { id } = req.params;
  Candidates.findById(id)
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `${notFoundText} ID: ${id}`, error: true });
      return res.status(200).json(data);
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
};

const edit = (req, res) => {
  const { id } = req.params;
  Candidates.findByIdAndUpdate(id, req.body, { new: true })
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `${notFoundText} ID: ${id}`, error: true });
      return res.status(200).json({ msg: 'Candidate updated', data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
};

module.exports = {
  getAll,
  getById,
  edit,
};
