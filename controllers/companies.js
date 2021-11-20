/* easdslint-disable consistent-return */
const Companies = require('../models/Companies');

const idNotFoundString = 'Company not found with ID:';

const getAll = (req, res) => {
  Companies.find()
    .then((data) => res.json({ data }))
    .catch((err) => res.status(500).json({ message: 'Error finding companies', err }));
};

const getById = (req, res) => {
  Companies.findById(req.params.id)
    .then((found) => {
      if (!found) return res.status(404).json({ message: `${idNotFoundString} ${req.params.id}` });
      return res.json(found);
    })
    .catch((err) => res.status(500).json({ message: 'Error finding company', err }));
};

const search = (req, res) => {
  Companies.find(req.query)
    .then((found) => {
      if (found.length === 0) {
        return res.status(404).json({ message: `Company not found with parameters: ${req.query}` });
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
      if (!found) return res.status(404).json({ message: `${idNotFoundString} ${req.params.id}` });
      return res.json({ message: 'Company edited successfully', Company: found });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error editing company', err });
    });
};

const remove = (req, res) => {
  Companies.findByIdAndRemove(req.params.id)
    .then((found) => {
      if (!found) return res.status(404).json({ message: `${idNotFoundString} ${req.params.id}` });
      return res.status(400).json({ message: 'Company deleted successfully', Company: found });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error deleting Company', err });
    });
};

module.exports = {
  getAll,
  getById,
  search,
  add,
  edit,
  remove,
};
