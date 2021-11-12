const openPositions = require('../models/Open-position');

const getAll = (req, res) => {
  openPositions
    .find()
    .then((data) => res.status(200).json({ data }))
    .catch((err) => res.status(400).json({ msg: `Error: ${err}` }));
};

const getById = () => {
  console.log('byid');
};

const getByIdCompany = () => {
  console.log('byCompanyId');
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
  getByIdCompany,
  add,
  edit,
  remove,
};
