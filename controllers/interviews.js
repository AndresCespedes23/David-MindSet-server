const Interviews = require('../models/Interviews.js');

const getAll = (req, res) => {
  Interviews.find()
    .then((interviews) => res.json({ interviews }))
    .catch((err) => res.status(400).json({ msg: `Error: ${err}` }));
};

const getById = (req, res) => {
};

const getByCompany = (req, res) => {
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
  getByCompany,
  add,
  edit,
  remove,
};
