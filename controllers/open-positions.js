const OpenPositions = require('../models/Open-position');

const getAll = (req, res) => {
  OpenPositions.find()
    .then((data) => res.status(200).json({ data }))
    .catch((err) => res.status(400).json({ msg: `Error: ${err}` }));
};

const getById = (req, res) => {
  const { id } = req.params;
  OpenPositions.findById(id)
    .then((data) => {
      if (!data) {
        return res.status(404).json({ msg: `Open Position not found by ID: ${id}` });
      }
      return res.status(200).json({ data });
    })
    .catch((err) => res.status(400).json({ msg: `Error: ${err}` }));
};

const getByIdCompany = (req, res) => {
  const { id } = req.params;
  OpenPositions.find({ idCompany: id })
    .then((data) => {
      if (data.length === 0) {
        return res.status(404).json({ msg: `Open Position not found by Company ID: ${id}` });
      }
      return res.status(200).json({ data });
    })
    .catch((err) => res.status(400).json({ msg: `Error: ${err}` }));
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
