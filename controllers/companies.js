/* eslint-disable consistent-return */
const Companies = require('../models/companies');

const { validate } = require('../validators/validators');

const getAll = async (req, res) => res.json(await Companies.find());

const getById = (req, res) => {
  Companies.findById(req.params.id)
    .then((found) => res.json(found))
    .catch((err) => res.status(404).json({ message: `Company not found with id: ${req.params.id}`, err: err.stack }));
};

const getByName = (req, res) => {
  Companies.find({ name: req.params.name }).then((companies) => {
    if (companies[0] === undefined) {
      return res.status(500).json({ message: `Company not found with name: ${req.params.name}` });
    }
    return res.json(companies);
  });
};

const add = (req, res) => {
  if (Object.keys(req.body).length === 0) return res.status(400).json({ message: 'Body empty' });
  const loadedCompany = new Companies({
    name: req.body.name,
    address: req.body.address,
    city: req.body.city,
    province: req.body.province,
    country: req.body.country,
    zipCode: req.body.zipCode,
    phone: req.body.phone,
    email: req.body.email,
    contactFullName: req.body.contactFullName,
    contactPhone: req.body.contactPhone,
  });
  if (validate(loadedCompany)) {
    return res.status(400).json({ message: `Missing parameters: ${validate(loadedCompany)}` });
  }
  loadedCompany.isActive = req.body.isActive || true;
  loadedCompany.pictureUrl = null;
  loadedCompany
    .save()
    .then(() => res.json({ message: 'Company added successfully', Company: loadedCompany }))
    .catch((err) => {
      console.log(err);
      if (err) return res.status(500).json({ message: `Error adding company: ${err.stack}` });
    });
};

const edit = (req, res) => {
  if (Object.keys(req.body).length === 0) return res.status(400).json({ message: 'Body empty' });
  Companies.findByIdAndUpdate(req.params.id, req.body, { strict: false })
    .exec()
    .then((found) => res.json({ message: 'Company edited successfully', Company: found }))
    .catch((err) => {
      if (err) return res.status(500).json({ message: 'Error editing company', err: err.stack });
    });
};

const remove = (req, res) => {
  Companies.findByIdAndDelete(req.params.id)
    .exec()
    .then(() => res.json({ message: 'Company deleted' }))
    .catch((err) => {
      if (err) return res.status(500).json({ message: 'Error deleting Company', err: err.stack });
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
