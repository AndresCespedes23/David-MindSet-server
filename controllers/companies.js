/* eslint-disable consistent-return */
const Companies = require('../models/companies');

const { validate } = require('../validators/validators');

const getAll = async (req, res) => {
  const companyFound = await Companies.find();
  return res.json(companyFound);
};

const getById = (req, res) => {
  Companies.findById(req.params.id, (err, found) => {
    if (err) {
      return res.status(404).json({ message: `Company not found with id: ${req.params.id}` });
    }
    return res.json(found);
  });
};

const getByName = (req, res) => {
  Companies.find({ name: req.params.name }, (err, docs) => {
    if (err) {
      return res.status(404).json({
        message: `Company not found with name: ${docs.name}`,
      });
    }
    return res.json(docs);
  });
};

const add = async (req, res) => {
  if (!req.params.id) return res.status(400).json({ message: 'Id not set' });
  if (!Object.keys(req.body)[0]) return res.status(400).json({ message: 'Body empty' });
  const loadedCompany = {
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
    isActive: req.body.isActive || true,
  };
  if (!validate(loadedCompany)) {
    return res.status(400).json({ message: 'Missing parameters' });
  }
  loadedCompany.pictureUrl = req.body.pictureUrl || undefined;

  const createdCompany = new Companies(loadedCompany);
  await createdCompany.save((err) => {
    if (err) return res.status(500).json({ message: `Error adding company: ${err}` });
    return res.json({ message: 'Company added successfully', Company: loadedCompany });
  });
};

const edit = (req, res) => {
  if (!req.params.id) return res.status(400).json({ message: 'Id not set' });
  if (!Object.keys(req.body)[0]) return res.status(400).json({ message: 'Body empty' });
  Companies.findByIdAndUpdate(req.params.id, req.body, (err, found) => {
    if (err) return res.status(500).json({ message: 'Error editing company' });
    return res.json({ message: 'Company edited successfully', Company: found });
  });
};

const remove = (req, res) => {
  if (!req.params.id) return res.status(400).json({ message: 'Id not set' });
  Companies.findByIdAndDelete(req.params.id, (err) => {
    if (err) return res.status(500).json({ message: 'Error deleting Company' });
    return res.json({ message: 'Company deleted' });
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
