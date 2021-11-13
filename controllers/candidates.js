const candidatesModel = require('../models/Candidates');

const getAll = (req, res) => {
  candidatesModel.find()
    .then((candidates) => res.status(200).json({ candidates }))
    .catch((error) => res.status(400).json({ msg: `Error: ${error}` }));
};

const getById = () => {
  console.log('getById');
};

const getByName = () => {
  console.log('getByName');
};

const add = () => {
  console.log('add');
};

const edit = () => {
  console.log('edit');
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
