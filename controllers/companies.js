const fs = require('fs');
const companies = require('../data/companies.json');

const getAll = (req, res) => {
  if (companies.length > 0) {
    res.json(companies);
  } else {
    res.json({});
  }
};

const getById = (req, res) => {
  const id = parseInt(req.params.id);
  const company = companies.find((company) => company.id === id);
  if (company) {
    res.json(company);
  } else {
    res.status(404).json({ message: `Company not found with id: ${id}` });
  }
};

const getByName = (req, res) => {
  const name = req.params.name;
  const company = companies.find((company) => company.name === name);
  if (company) {
    res.json(company);
  } else {
    res.status(404).json({ message: `Company not found with name: ${name}` });
  }
};

const add = (req, res) => {
  const newCompany = {
    id: companies.length + 1,
    name: req.query.name,
    address: req.query.address,
    city: req.query.city,
    province: req.query.province,
    country: req.query.country,
    zipCode: req.query.zipCode,
    phone: req.query.phone,
    email: req.query.email,
    pictureUrl: req.query.pictureUrl,
    contactFullName: req.query.contactFullName,
    contactPhone: req.query.contactPhone,
    isActive: req.query.isActive,
  };

  if (haveAllFieldsComplete(newCompany)) {
    companies.push(newCompany);
    fs.writeFile('./data/companies.json', JSON.stringify(companies), (err) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: 'Error adding company' });
      }
    });
    res.json({ message: 'Company added successfully', company: newCompany });
  } else {
    res.status(400).json({ message: 'Missing parameters' });
  }
};

const edit = (req, res) => {
  const id = parseInt(req.params.id);
  const company = companies.find((company) => company.id === id);
  if (company) {
    for (let key in company) {
      company[key] = req.query[key] ? req.query[key] : company[key];
    }
    fs.writeFile('./data/companies.json', JSON.stringify(companies), (err) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: 'Error editing company' });
      }
    });
    res.json({ message: 'Company edited successfully', company });
  } else {
    res.status(404).json({ message: 'Company not found with id: ${id}' });
  }
};

const remove = (req, res) => {
  const id = parseInt(req.params.id);
  const company = companies.find((company) => company.id === id);
  if (company) {
    const newListOfCompanies = companies.filter((company) => company.id !== id);
    fs.writeFile('./data/companies.json', JSON.stringify(newListOfCompanies), (err) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: 'Error editing company' });
      }
    });
    res.json({ msg: 'Company deleted' });
  } else {
    res.status(404).json({ message: `Company not found with id ${id}` });
  }
};

const haveAllFieldsComplete = (object) => {
  for (let key in object) {
    if (object[key] === undefined) {
      return false;
    }
  }
  return true;
};

module.exports = {
  getAll: getAll,
  getById: getById,
  getByName: getByName,
  add: add,
  edit: edit,
  remove: remove,
};
