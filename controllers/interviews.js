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
  const newInterview = new Interview({
    idCompany: req.body.idCompany,
    idCandidate: req.body.idCandidate,
    date: req.body.date,
    status: req.body.status,
    isActive: true,
  });
  newInterview
    .save()
    .then((data) => res.json({ msg: 'New interview added', data }))
    .catch((err) => res.status(400).json({ msg: `Error: ${err}` }));
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
