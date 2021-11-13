const Candidates = require('../models/Candidates');

const getAll = (req, res) => {
  Candidates.find()
    .then((candidates) => res.json({ candidates }))
    .catch((error) => res.status(400).json({ msg: `Error: ${error}` }));
};

const getById = (req, res) => {
  const { id } = req.params;
  Candidates.findById(id)
    .then((data) => {
      if (!data) {
        return res.status(404).json({ msg: `No candidate with the id of ${id} founded` });
      }
      return res.json({ data });
    })
    .catch((err) => res.status(400).json({ msg: `Error: ${err}` }));
};

const getByName = (req, res) => {
  const { name } = req.params;
  Candidates.find({ firstName: name })
    .then((data) => {
      if (data.length === 0) {
        return res.status(404).json({ msg: `No candidate with the name of ${name} founded` });
      }
      return res.json({ data });
    })
    .catch((err) => res.status(400).json({ msg: `Error: ${err}` }));
};

const add = (req, res) => {
  const newCandidate = new Candidates({
    firstName: req.body.firstName,
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
  newCandidate.save((err, candidate) => {
    if (err) {
      return res.status(400).json({ msg: `Error: ${err}` });
    }
    return res.json({ msg: 'Candidate created', candidate });
  });
};

const edit = (req, res) => {
  const { id } = req.params;
  Candidates.findByIdAndUpdate(id, req.body, { new: true }, (err, newCandidate) => {
    if (err) {
      return res.status(400).json({ msg: `Error: ${err}` });
    }
    if (!newCandidate) {
      return res.status(404).json({ msg: `No candidate with the id of ${id} founded` });
    }
    return res.json({ msg: 'Candidate updated', newCandidate });
  });
};

const remove = () => {
  console.log('remove');
};

module.exports = {
  getAll,
  getById,
  getByName,
  add,
  edit,
  remove,
};
