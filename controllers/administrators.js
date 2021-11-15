const Administrators = require('../models/Administrators'); // insted of re-write json we reach /models/Administrators where is the conection with Moongose and it's Schema

const notFoundTxt = 'Administrator not found by';

const getAll = (req, res) => {
  Administrators.find() // find() is from Moongose documentation
    .then((data) => res.json({ data }))
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const getById = (req, res) => {
  const { id } = req.params;
  Administrators.findById(id)
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `${notFoundTxt} ID: ${id}` });
      return res.json({ data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const search = (req, res) => {
  const queryParam = req.query;
  const firstName = queryParam.name.toLowerCase() || null;
  if (!firstName) return res.status(400).json({ msg: 'Missing query param: name' });
  return Administrators.find({ firstName })
    .then((data) => {
      if (data.length === 0) return res.status(404).json({ msg: `${notFoundTxt} name: ${firstName}` });
      return res.json({ data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const add = (req, res) => {
  const newAdministrator = new Administrators({
    firstName: req.body.firstName.toLowerCase(),
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    isActive: true,
  });
  newAdministrator
    .save()
    .then((data) => res.json({ msg: 'Administrator created', data }))
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const edit = (req, res) => {
  const { id } = req.params;
  if (req.body.firstName) {
    req.body.firstName = req.body.firstName.toLowerCase();
  }
  Administrators.findByIdAndUpdate(id, req.body, { new: true })
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `${notFoundTxt} ID: ${id}` });
      return res.json({ msg: 'Administrator updated', data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const remove = (req, res) => {
  const { id } = req.params;
  Administrators.findByIdAndRemove(id)
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `${notFoundTxt} ID: ${id}` });
      return res.json({ msg: 'Administrator removed', data });
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
