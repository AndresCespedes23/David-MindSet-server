const companies = require("../data/companies.json");

const getAll = (req, res) => {
  res.json(companies);
  console.log(req.protocol + "://" + req.get("host"));
  //console.log(companies)
};

const getById = (req, res) => {
  const id = parseInt(req.params.id);
  const company = companies.find((company) => company.id === id);
  if(company) {
    res.json(company);
  } else {
    res.status(404).json({ message: "Company not found" });
  }
};

const getByName = (req, res) => {
  const name = req.params.name;
    const company = companies.find((company) => company.name === name);
    if(company) {
      res.json(company);
    } else {
      res.status(404).json({ message: "Company not found" });
    }
};

const add = (req, res) => {
  // your code here
};

const edit = (req, res) => {
  // your code here
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
