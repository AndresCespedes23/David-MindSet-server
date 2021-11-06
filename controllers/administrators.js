const adminData = require('../data/administrators.json')

const getAll = (req, res) => {
    res.json(adminData)
};

const getById = (req, res) => {
    const foundId = adminData.some(administrator => administrator.id === parseInt(req.params.id));
    if (foundId) {
        res.json(adminData.filter(administrator => administrator.id === parseInt(req.params.id)))
    }   else {
        res.status(400).json({ msg: `No administrator with the id of ${req.params.id}` })
    }
};

const getByName = (req, res) => {
    const foundName = adminData.some(administrator => administrator.firstName === (req.params.name));
    if (foundName) {
        res.json(adminData.filter(administrator => administrator.firstName === (req.params.name)))
    }   else {
        res.status(400).json({ msg: `No administrator with the first name of ${req.params.name}` })
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
  remove: remove
};