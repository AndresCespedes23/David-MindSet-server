const Candidates = require('../models/Candidates');

const getAll = (req, res) => {
  Candidates.find()
    .then((candidates) => res.status(200).json({ candidates }))
    .catch((error) => res.status(400).json({ msg: `Error: ${error}` }));
};

const getById = (req, res) => {
  const { id } = req.params;
  Candidates.findById(id)
    .then((data) => {
      if (!data) {
        return res.status(404).json({ msg: `No candidate with the id of ${id} founded` });
      }
      return res.status(200).json({ data });
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
  getByName,
  add,
  edit,
  remove,
};
