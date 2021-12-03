const Psychologist = require('../models/Psychologists');

const notFoundTxt = 'Psychologist not found by';

const getAll = (req, res) => {
  Psychologist.find()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
};

const getById = (req, res) => {
  const { id } = req.params;
  Psychologist.findById(id)
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `${notFoundTxt} ID: ${id}`, error: true });
      return res.status(200).json(data);
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
};

const search = (req, res) => {
  const { text } = req.query;
  Psychologist.find({ firstName: text })
    .then((data) => {
      if (data.length === 0) return res.status(404).json({ msg: `${notFoundTxt} Name: ${text}`, error: true });
      return res.status(200).json(data);
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
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
  newPsychologist.save()
    .then((data) => res.status(201).json({ msg: 'Psychologist created', data }))
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

const remove = (req, res) => {
  const { id } = req.params;
  Psychologist.findByIdAndRemove(id)
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `${notFoundTxt} ID: ${id}`, error: true });
      return res.status(200).json({ msg: 'Psychologist deleted', data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
};

module.exports = {
  getAll,
  getById,
  search,
  add,
  edit,
  remove,
};
