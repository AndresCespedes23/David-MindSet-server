/* easdslint-disable consistent-return */
const Companies = require('../models/companies');

const getAll = (req, res) => {
  Companies.find()
    .then((data) => res.json(data))
    .catch((err) => res.status(500).json({ message: `Error adding company: ${err}` }));
};

const getById = (req, res) => {
  Companies.findById(req.params.id)
    .then((found) => res.json(found))
    .catch((err) =>
      res.status(404).json({ message: `Company not found with id: ${req.params.id}`, err })
    );
};

const getByName = (req, res) => {
  Companies.find({ name: req.query.name })
    .then((companies) => {
      if (companies.length === 0) {
        return res.status(404).json({ message: `Company not found with name: ${req.params.name}` });
      }
      return res.json(companies);
    })
    .catch((err) => res.status(500).json({ message: err }));
};

const add = (req, res) => {
  new Companies(req.body)
    .save()
    .then(() => res.json({ message: 'Company added successfully', Company: createdCompany }))
    .catch((err) => {
      res.status(500).json({ message: `Error adding company: ${err}` });
    });
};

const edit = (req, res) => {
  Companies.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((found) => res.json({ message: 'Company edited successfully', Company: found }))
    .catch((err) => {
      res.status(500).json({ message: 'Error editing company', err });
    });
};

const remove = (req, res) => {
  Companies.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: 'Company deleted' }))
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
