const fs = require('fs');
const openPositions = require('../data/open-positions.json');


const getAll = (req, res) => {
    if(openPositions.length > 0) {
        res.json(openPositions);
    } else {
        res.json({});
    }
};

// const getById = (req, res) => {
//     var filtererPositions = openPositions.filter(item => item.id.includes(req.param.id));
//     res.json(filtererPositions);
// };

const getById = (req, res) => {
    const id = parseInt(req.params.id);
    const openPosition = openPositions.find((openPosition) => openPosition.id === id);
    if (openPosition) {
      res.json(openPosition);
    } else {
      res.status(404).json({ message: `Open position not found with id: ${id}` });
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