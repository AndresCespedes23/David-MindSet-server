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
  const { id } = req.params;
  Interviews.findByIdAndUpdate(id, req.body, { new: true })
    .then((data) => {
      if (!data) {
        return res.status(404).json({ msg: `Interview not found by ID: ${id}` });
      }
      return res.json({ msg: 'Interview updated', data });
    })
    .catch((err) => res.status(400).json({ msg: `Error: ${err}` }));
};

const remove = (req, res) => {
  const { id } = req.params;
  Interviews.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        return res.status(404).json({ msg: `Interview not found by ID: ${id}` });
      }
      return res.json({ msg: 'Interview removed', data });
    })
    .catch((err) => res.status(400).json({ msg: `Error: ${err}` }));
};

module.exports = {
  getAll,
  getById,
  getByCompany,
  add,
  edit,
  remove,
};
