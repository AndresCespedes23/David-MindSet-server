const fs = require('fs');
const profileTypes = require('../data/profiles-types.json');

const getAll = (req, res) => {
    // your code here
    res.json(profileTypes);

};

const getById = (req, res) => {
    // your code here
    const profilesTypes  = profileTypes.find((profilesTypes) => profilesTypes.id === parseInt(req.params.id));
    if (profilesTypes) {
      res.json(profilesTypes);
    } else {
      res.status(404).json({ message: `Profile not found with id: ${parseInt(req.params.id)}` });
    }
};

const getByName = (req, res) => {
    // your code here
    
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