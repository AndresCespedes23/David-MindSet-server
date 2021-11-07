const adminData = require('../data/administrators.json');
const fs = require('fs');

const getAll = (req, res) => {
    if (adminData.length > 0) {
        res.json(adminData)
    } else {
        res.json({})
    }
    
};

const getById = (req, res) => {
    const foundId = adminData.some(administrator => administrator.id === parseInt(req.params.id));
    if (foundId) {
        res.json(adminData.filter(administrator => administrator.id === parseInt(req.params.id)))
    }   else {
        res.status(404).json({ msg: `No administrator with the id of ${req.params.id} founded` })
    }
};

const getByName = (req, res) => {
    const foundName = adminData.some(administrator => administrator.firstName === (req.params.name));
    if (foundName) {
        res.json(adminData.filter(administrator => administrator.firstName === (req.params.name)))
    }   else {
        res.status(404).json({ msg: `No administrator with the first name of ${req.params.name} founded` })
    }
};

const add = (req, res) => {
    const newAdmin = {
        id: req.query.id,
        firstName: req.query.firstName,
        lastName: req.query.lastName,
        email: req.query.email,
        password: req.query.password,
        isActive: req.query.isActive
    }

    adminData.push(newAdmin)
    fs.writeFile("./data/administrators.json", JSON.stringify(adminData), err => {
        if (err) { res.status(500) }
      })
    res.json(newAdmin)
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
  remove: remove
};