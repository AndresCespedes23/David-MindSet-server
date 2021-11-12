const Psychologists = require('../models/Psychologists');
const Psychologist = require('../models/Psychologists');

const getAll = (req, res) => {
  Psychologist.find()
    .then((psychologists) => res.json({ psychologists }))
    .catch((err) => res.status(400).json({ msg: `Error: ${err}` }));
};

const getById = (req, res) => {
  const { id } = req.param;
  Psychologists.find()
    .then((pyschologist) => {
      res.json({ pyschologist });
    })
    .catch(() => res.status(400).json({ msg: 'Psychologists not found' }));
};

const getByName = (req, res) => {
};

const add = (req, res) => {

};

const edit = (req, res) => {
};

const remove = (req, res) => {
};

module.exports = {
  getAll,
  getById,
  getByName,
  add,
  edit,
  remove,
};
