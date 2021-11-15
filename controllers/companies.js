/* easdslint-disable consistent-return */
const Companies = require('../models/companies');
const idNotFoundString = 'Company not found with ID:';

const getAll = (req, res) => {
  Companies.find()
    .then((found) => {
      if (found.length === 0) {
        return res.status(404).json({ msg: 'No companies found' });
      }
      return res.json(found);
    })
    .catch((err) => res.status(500).json({ message: 'Error finding companies', err }));
};

const getById = (req, res) => {
  Companies.findById(req.params.id)
    .then((found) => {
      if (!found) {
        return res.status(404).json({ msg: `${idNotFoundString} ${req.params.id}` });
      }
      return res.json(found);
    })
    .catch((err) => res.status(500).json({ message: 'Error finding company', err }));
};

const getByName = (req, res) => {
  Companies.find({ name: req.query.name })
    .then((found) => {
      if (found.length === 0) {
        return res.status(404).json({ message: `Company not found with name: ${req.query.name}` });
      }
      return res.json(found);
    })
    .catch((err) => res.status(500).json({ message: 'Error finding company', err }));
};

const add = (req, res) => {
  new Companies(req.body)
    .save()
    .then(() => res.json({ message: 'Company added successfully', Company: req.body }))
    .catch((err) => {
      res.status(500).json({ message: 'Error adding company:', err });
    });
};

const edit = (req, res) => {
  Companies.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((found) => {
      if (!found) {
        return res.status(404).json({ msg: `${idNotFoundString} ${req.params.id}` });
      }
      return res.json({ message: 'Company edited successfully', Company: found });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error editing company', err });
    });
};

const remove = (req, res) => {
  Companies.findByIdAndRemove(req.params.id)
    .then((found) => {
      if (!found) {
        return res.status(404).json({ msg: `${idNotFoundString} ${req.params.id}` });
      }
      return res.status(400).json({ message: 'Company deleted successfully', Company: found });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error deleting Company', err });
    });
};

module.exports = {
  getAll,
  getById,
  getByName,
  add,
  edit,
  remove,
};
