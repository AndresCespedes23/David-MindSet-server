const fs = require('fs');
let companies = require('../data/companies.json');

const validate = (object) => {
  for (let key in object) {
    if (object[key] === undefined) {
      return false;
    }
  }
  return true;
};

const getLastId = (collection) => {
  let larger = 0;
  collection.forEach((element) => {
    if (element.id > larger) {
      larger = element.id;
    }
  });
  return larger;
};

const getAll = (req, res) => {
  res.json(companies);
};

const getById = (req, res) => {
  const id = parseInt(req.params.id);
  const companyFound = companies.find((company) => company.id === id);
  if (!companyFound) {
    return res.status(404).json({ message: `Company not found with id: ${id}` });
  } 
  res.json(companyFound);
};

const getByName = (req, res) => {
  const name = req.params.name;
  const companyFound = companies.filter((company) => company.name === name);
  if (companyFound.length > 0) {
    res.json(companyFound);
  } else {
    res.status(404).json({ message: `Company not found with name: ${name}` });
  }
};

const add = (req, res) => {
  const newCompany = {
    id: getLastId(companies) + 1,
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

  if (validate(newCompany)) {
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
  const companyFound = companies.find((company) => company.id === id);
  if (!companyFound) {
    res.status(404).json({ message: `Company not found with id ${id}` });
    return;
  }

  companies = companies.map((company) => {
    if (company.id === id) {
      company.name = req.query.name || company.name;
      company.address = req.query.address || company.address;
      company.city = req.query.city || company.city;
      company.province = req.query.province || company.province;
      company.country = req.query.country || company.country;
      company.zipCode = req.query.zipCode || company.zipCode;
      company.phone = req.query.phone || company.phone;
      company.email = req.query.email || company.email;
      company.pictureUrl = req.query.pictureUrl || company.pictureUrl;
      company.contactFullName = req.query.contactFullName || company.contactFullName;
      company.contactPhone = req.query.contactPhone || company.contactPhone;
      company.isActive = req.query.isActive || company.isActive;
    }
    return company;
  });

  fs.writeFile('./data/companies.json', JSON.stringify(companies), (err) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: 'Error editing company' });
    }
  });

  res.json({ message: 'Company edited successfully', companyFound });
};

const remove = (req, res) => {
  const id = parseInt(req.params.id);
  const companyFound = companies.find((company) => company.id === id);
  if (!companyFound) {
    res.status(404).json({ message: `Company not found with id ${id}` });
    return;
  }

  companies = companies.filter((company) => company.id !== id);
  fs.writeFile('./data/companies.json', JSON.stringify(companies), (err) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: 'Error editing company' });
    }
  });
  res.json({ msg: 'Company deleted' });
};

module.exports = {
  getAll: getAll,
  getById: getById,
  getByName: getByName,
  add: add,
  edit: edit,
  remove: remove,
};
