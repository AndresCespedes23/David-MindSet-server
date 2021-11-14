const Administrators = require('../models/Administrators'); // insted of re-write json we reach /models/Administrators where is the conection with Moongose and it's Schema

const getAll = (req, res) => {
  Administrators.find() // find() is from Moongose documentation
    .then((administrators) => res.json({ administrators }))
    .catch((err) => res.status(400).json({ msg: `Error: ${err}` }));
};

const getById = (req, res) => {
  const { id } = req.params;
  Administrators.findById(id)
    .then((administrators) => {
      if (!administrators) {
        return res.status(404).json({ msg: `Administrators not found by ID: ${id}` });
      }
      return res.json({ administrators });
    })
    .catch((err) => res.status(400).json({ msg: `Error: ${err}` }));
};

const getByName = (req, res) => {
  const { name } = req.params;
  Administrators.find({ firstName: name.toLowerCase() })
    .then((administrators) => {
      if (administrators.length === 0) {
        return res.status(404).json({ msg: `Administrators not found by name: ${name}` });
      }
      return res.json({ administrators });
    })
    .catch((err) => res.status(400).json({ msg: `Error: ${err}` }));
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
    .catch((err) => res.status(400).json({ msg: `Error: ${err}` }));
};

const edit = (req, res) => {
  const { id } = req.params;
  req.body.firstName = req.body.firstName.toLowerCase();
  Administrators.findByIdAndUpdate(id, req.body, { new: true })
    .then((data) => {
      if (!data) {
        return res.status(404).json({ msg: `Administrator not fund by ID: ${id}` });
      }
      return res.json({ msg: 'Administrator updated', data });
    })
    .catch((err) => res.status(400).json({ msg: `Error: ${err}` }));
};

const remove = (req, res) => {
  const { id } = req.params;
  Administrators.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        return res.status(404).json({ msg: `Administrator not found by ID: ${id}` });
      }
      return res.json({ msg: 'Administrator removed', data });
    })
    .catch((err) => res.status(400).json({ msg: `Error: ${err}` }));
};

module.exports = {
  getAll,
  getById,
  getByName,
  add,
  edit,
  remove,
};
