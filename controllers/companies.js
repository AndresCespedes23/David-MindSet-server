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
  };
  companies.push(newCompany);
  fs.writeFile("./data/companies.json", JSON.stringify(companies), (err) => {
    if (err) {
      console.log(err)
      res.status(500).json({ message: "Error adding company" });
    }
  });
  res.json({ message: "Company added successfully", newCompany });
};

const edit = (req, res) => {
  const id = parseInt(req.params.id);
  const company = companies.find((company) => company.id === id);
  if (company) {
    const updateCompany = req.body;
    company.name = updateCompany.name ? updateCompany.name : company.name;
    res.json({ message: "Company updated successfully", company });
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
