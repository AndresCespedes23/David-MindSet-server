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
    for (let key in company) {
      company[key] = req.query[key] ? req.query[key] : company[key];
    }

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
