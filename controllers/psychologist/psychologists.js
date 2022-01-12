const Psychologist = require('../../models/Psychologists');

const notFoundTxt = 'Psychologist not found by';

const getById = (req, res) => {
  const { id } = req.params;
  Psychologist.findById(id)
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `${notFoundTxt} ID: ${id}`, error: true });
      return res.status(200).json(data);
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
};

const edit = (req, res) => {
  const { id } = req.params;
  Psychologist.findByIdAndUpdate(id, req.body, { new: true })
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `${notFoundTxt} ID: ${id}`, error: true });
      return res.status(200).json({ msg: 'Psychologist updated', data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
};

module.exports = {
  getById,
  edit,
};
