const ProfileTypes = require('../models/Profile-types');

const getAll = (req, res) => {
  ProfileTypes.find()
    .then((profileType) => res.json(profileType))
    .catch((error) => res.status(500).json({ msg: `Error: ${error}` }));
};

const getById = (req, res) => {
  const id = req.params;
  ProfileTypes.findById(id)
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `No profile type founded on ID: ${id}` });
      return res.json({ data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const getByName = (req, res) => {

};

const add = () => {
  console.log('Hola mundo');
};

const edit = () => {
  console.log('Hola mundo');
};

const remove = () => {
  console.log('Hola mundo');
};

module.exports = {
  getAll,
  getById,
  getByName,
  add,
  edit,
  remove,
};
