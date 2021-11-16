const Candidates = require('../models/Candidates');

const notFoundText = 'Candidate not found by';

const getAll = (req, res) => {
  Candidates.find()
    .then((candidates) => res.json({ candidates }))
    .catch((error) => res.status(500).json({ msg: `Error: ${error}` }));
};

const getById = (req, res) => {
  const { id } = req.params;
  Candidates.findById(id)
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `${notFoundText} ID: ${id}` });
      return res.json({ data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const search = (req, res) => {
  const queryParam = req.query;
  const firstName = queryParam.name.toLowerCase() || null;
  if (!firstName) return res.status(400).json({ msg: 'Missing query param: name' });
  return Candidates.find({ firstName })
    .then((data) => {
      if (data.length === 0) return res.status(404).json({ msg: `${notFoundText} name: ${firstName}` });
      return res.json({ data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
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
  });
  newCandidate
    .save()
    .then((candidate) => res.json({ msg: 'Candidate created', candidate }))
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const edit = (req, res) => {
  const { id } = req.params;
  if (req.body.firstName) {
    req.body.firstName = req.body.firstName.toLowerCase();
  }
  Candidates.findByIdAndUpdate(id, req.body, { new: true })
    .then((newCandidate) => {
      if (!newCandidate) return res.status(404).json({ msg: `${notFoundText} ID: ${id}` });
      return res.json({ msg: 'Candidate updated', newCandidate });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const remove = (req, res) => {
  const { id } = req.params;
  Candidates.findByIdAndRemove(id)
    .then((removedCandidate) => {
      if (!removedCandidate) return res.status(404).json({ msg: `${notFoundText} ID: ${id}` });
      return res.json({ msg: 'Candidate removed', removedCandidate });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

module.exports = {
  getAll,
  getById,
  search,
  add,
  edit,
  remove,
};
