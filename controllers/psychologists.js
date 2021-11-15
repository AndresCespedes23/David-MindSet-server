const Psychologist = require('../models/Psychologists');

const notFoundTxt = 'Psychologist not found by';

const getAll = (req, res) => {
  Psychologist.find()
    .then((psychologists) => res.json({ psychologists }))
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const getById = (req, res) => {
  const { id } = req.params;
  Psychologist.findById(id)
    .then((psychologist) => {
      if (!psychologist) return res.status(404).json({ msg: `${notFoundTxt} ID: ${id}` });
      return res.json({ psychologist });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const search = (req, res) => {
  const { text } = req.query;
  Psychologist.find({ name: text.toLowerCase() })
    .then((psychologists) => {
      if (psychologists.length === 0) return res.status(404).json({ msg: `${notFoundTxt} Name: ${text}` });
      return res.json({ psychologists });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const add = (req, res) => {
  const newPsychologist = new Psychologist({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    pictureUrl: req.body.pictureUrl,
    turns: [],
    isActive: true,
  });
  newPsychologist.save((err, psychologist) => {
    if (err) return res.status(500).json({ msg: `Error: ${err}` });
    return res.json({ msg: 'Psychologist created', psychologist });
  });
};

const edit = (req, res) => {
  const { id } = req.params;
  Psychologist.findByIdAndUpdate(id, req.body, { new: true }, (err, psychologist) => {
    if (err) return res.status(500).json({ msg: `Error: ${err}` });
    if (!psychologist) return res.status(404).json({ msg: `${notFoundTxt} ID: ${id}` });
    return res.json({ msg: 'Psychologist updated', psychologist });
  });
};

const remove = (req, res) => {
  const { id } = req.params;
  Psychologist.findByIdAndDelete(id, (err, psychologist) => {
    if (err) return res.status(500).json({ msg: `Error: ${err}` });
    if (!psychologist) return res.status(404).json({ msg: `${notFoundTxt} ID: ${id}` });
    return res.json({ msg: 'Psychologist updated', psychologist });
  });
};

module.exports = {
  getAll,
  getById,
  search,
  add,
  edit,
  remove,
};
