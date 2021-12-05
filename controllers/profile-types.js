const ProfileTypes = require('../models/ProfileTypes');

const notFoundTxt = 'Profile type not found by';

const getAll = (req, res) => {
  ProfileTypes.find()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
};

const getById = (req, res) => {
  const { id } = req.params;
  ProfileTypes.findById(id)
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `${notFoundTxt} ID: ${id}`, error: true });
      return res.status(200).json(data);
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
};

const search = (req, res) => {
  const { name } = req.query;
  ProfileTypes.find({ name })
    .then((data) => {
      if (data.length === 0) return res.status(404).json({ msg: `${notFoundTxt} name: ${name}`, error: true });
      return res.status(200).json(data);
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
};

const add = (req, res) => {
  const newProfileType = new ProfileTypes({
    name: req.body.name,
    isActive: true,
  });
  newProfileType
    .save()
    .then((data) => res.status(201).json({ msg: 'Profile created: ', data }))
    .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
};

const edit = (req, res) => {
  const { id } = req.params;
  ProfileTypes.findByIdAndUpdate(id, req.body, { new: true })
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `${notFoundTxt} ID: ${id}`, error: true });
      return res.status(200).json({ msg: 'Profile type updated', data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
};

const remove = (req, res) => {
  const { id } = req.params;
  ProfileTypes.findByIdAndRemove(id)
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `${notFoundTxt} ID: ${id}`, error: true });
      return res.status(200).json({ msg: 'Profile type deleted', data });
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
