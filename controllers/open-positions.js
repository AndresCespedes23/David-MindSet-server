const fs = require('fs');
const openPositions = require('../data/open-positions.json');


const getAll = (req, res) => {
    if(openPositions.length > 0) {
        res.json(openPositions);
    } else {
        res.json({});
    }
};

const getById = (req, res) => {
    // your code here
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