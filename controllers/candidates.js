const Candidates = require('../models/Candidates');

const notFoundText = 'Candidate not found by';

const getAll = (req, res) => {
  Candidates.find()
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

const search = (req, res) => {
  const queryParam = req.query;
  const firstName = queryParam.name.toLowerCase() || null;
  if (!firstName) return res.status(400).json({ msg: 'Missing query param: name', error: true });
  return Candidates.find({ firstName })
    .then((data) => {
      if (data.length === 0) return res.status(404).json({ msg: `${notFoundText} name: ${firstName}`, error: true });
      return res.status(200).json(data);
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
};

const add = (req, res) => {
  const newCandidate = new Candidates({
    firstName: req.body.firstName.toLowerCase(),
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    address: {
      street: req.body.address.street,
      number: req.body.address.number,
    },
    city: req.body.city,
    province: req.body.province,
    country: req.body.country,
    postalCode: req.body.postalCode,
    birthday: req.body.birthday,
    pictureUrl: req.body.pictureUrl,
  });
  newCandidate
    .save()
    .then((data) => res.status(201).json({ msg: 'Candidate created', data }))
    .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
};

const edit = (req, res) => {
  const { id } = req.params;
  if (req.body.firstName) {
    req.body.firstName = req.body.firstName.toLowerCase();
  }
  Candidates.findByIdAndUpdate(id, req.body, { new: true })
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `${notFoundText} ID: ${id}`, error: true });
      return res.status(200).json({ msg: 'Candidate updated', data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
};

const remove = (req, res) => {
  const { id } = req.params;
  Candidates.findByIdAndRemove(id)
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `${notFoundText} ID: ${id}`, error: true });
      return res.status(200).json({ msg: 'Candidate deleted', data });
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
