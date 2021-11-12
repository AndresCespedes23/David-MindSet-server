const Psychologist = require('../models/Psychologists');

const getAll = (req, res) => {
  Psychologist.find()
    .then((psychologists) => res.json({ psychologists }))
    .catch((err) => res.status(400).json({ msg: `Error: ${err}` }));
};

const getById = (req, res) => {
  const { id } = req.params;
  Psychologist.findById(id)
    .then((psychologist) => {
      if (!psychologist) {
        return res.status(404).json({ msg: `Psychologists not found by ID: ${id}` });
      }
      return res.json({ psychologist });
    })
    .catch((err) => res.status(400).json({ msg: `Error: ${err}` }));
};

const getByName = (req, res) => {
  const { name } = req.params;
  Psychologist.find({ name: name.toLowerCase() })
    .then((psychologists) => res.json({ psychologists }))
    .catch((err) => res.status(400).json({ msg: `Error: ${err}` }));
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
    if (err) {
      return res.status(400).json({ msg: `Error: ${err}` });
    }
    return res.json({ msg: 'Psychologist created', psychologist });
  });
};

const edit = (req, res) => {
  const { id } = req.params;
  const changes = new Psychologist({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    pictureUrl: req.body.pictureUrl,
    turns: [],
    isActive: true,
  });
  Psychologist.findByIdAndUpdate(id, changes, { new: true }, (err, psychologist) => {
    if (err) {
      return res.status(400).json({ msg: `Error: ${err}` });
    }
    if (!psychologist) {
      return res.status(404).json({ msg: `Psychologists not found by ID: ${id}` });
    }
    return res.json({ msg: 'Psychologist updated', psychologist });
  });
};

const remove = (req, res) => {
  const { id } = req.params;
  Psychologist.findByIdAndDelete(id, (err, psychologist) => {
    if (err) {
      return res.status(400).json({ msg: `Error: ${err}` });
    }
    if (!psychologist) {
      return res.status(404).json({ msg: `Psychologists not found by ID: ${id}` });
    }
    return res.json({ msg: 'Psychologist updated', psychologist });
  });
};

module.exports = {
  getAll,
  getById,
  getByName,
  add,
  edit,
  remove,
};
