const fs = require("fs");
const companies = require("../data/companies.json");

const getAll = (req, res) => {
  res.json(companies);
};

const getById = (req, res) => {
  const id = parseInt(req.params.id);
  const company = companies.find((company) => company.id === id);
  if (company) {
    res.json(company);
  } else {
    res.status(404).json({ message: "Company not found" });
  }
};

const getByName = (req, res) => {
  const name = req.params.name;
  const company = companies.find((company) => company.name === name);
  if (company) {
    res.json(company);
  } else {
    res.status(404).json({ message: "Company not found" });
  }
};

const add = (req, res) => {
  //agregar validaciones
  const newCompany = {
    id: companies.length + 1,
    name: req.query.name,
    address: req.query.address,
    city: req.query.city,
    country: req.query.country,
    zipCode: req.query.zipCode,
    phone: req.query.phone,
    email: req.query.email,
    pictureUrl: req.query.pictureUrl,
    contactFullName: req.query.contactFullName,
    contactPhone: req.query.contactPhone,
    isActive: req.query.isActive,
  };

  companies.push(newCompany);

  fs.writeFile("./data/companies.json", JSON.stringify(companies), (err) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Error adding company" });
    }
  });
  res.json({ message: "Company added successfully", newCompany });
};

const edit = (req, res) => {
  const id = parseInt(req.params.id);
  const company = companies.find((company) => company.id === id);
  if (company) {
    company.name = req.query.name ? req.query.name : company.name;
    company.address = req.query.address ? req.query.address : company.address;
    company.city = req.query.city ? req.query.city : company.city;
    company.country = req.query.country ? req.query.country : company.country;
    company.zipCode = req.query.zipCode ? req.query.zipCode : company.zipCode;
    company.phone = req.query.phone ? req.query.phone : company.phone;
    company.email = req.query.email ? req.query.email : company.email;
    company.pictureUrl = req.query.pictureUrl ? req.query.pictureUrl : company.pictureUrl;
    company.contactFullName = req.query.contactFullName ? req.query.contactFullName : company.contactFullName;
    company.contactPhone = req.query.contactPhone ? req.query.contactPhone : company.contactPhone;
    company.isActive = req.query.isActive ? req.query.isActive : company.isActive;

    fs.writeFile("./data/companies.json", JSON.stringify(companies), (err) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "Error editing company" });
      }
    });
    res.json({ message: "Company edited successfully", company });
  } else {
    res.status(404).json({ message: "Company not found" });
  }
};

const remove = (req, res) => {
  // your code here
};

module.exports = {
  getAll: getAll,
  getById: getById,
  getByName: getByName,
  add: add,
  edit: edit,
  remove: remove,
};
