const fs = require('fs');
const openPositions = require('../data/open-positions.json');


const getAll = (req, res) => {
    if(openPositions.length > 0) {
        res.json(openPositions);
    } else {
        res.json({});
    }
};

const add = (req, res) => {
    // Add new open position
    const newOpenPosition = {
        id: openPositions.length + 1,
        idCompany: req.query.idCompany,
        startDate: req.query.startDate,
        endDate: req.query.endDate,
        jobDescription: req.query.jobDescription,
        isActive: req.query.isActive
    };
    if(!newOpenPosition.id || !newOpenPosition.idCompany || !newOpenPosition.startDate || !newOpenPosition.endDate || !newOpenPosition.jobDescription || !newOpenPosition.isActive) {
        res.send(400)
    }
    openPositions.push(newOpenPosition);
    fs.writeFile('./data/open-positions.json', JSON.stringify(openPositions), err => {
        if (err) {
            res.send(500, 'Error trying to save new data');
        }
    });
    res.json(newOpenPosition);
};

const getById = (req, res) => {
    const id = parseInt(req.query.id);
    const openPosition = openPositions.find((openPosition) => openPosition.id === id);
    if (openPosition) {
      res.json(openPosition);
    } else {
      res.status(404).json({ message: `Open position not found with id: ${id}` });
    }
};

const getByIdCompany = (req, res) => {
    const idCompany = parseInt(req.query.idCompany);
    const openPositions = openPositions.find((openPosition) => openPosition.idCompany === idCompany);
    if (openPositions) {
      res.json(openPositions);
    } else {
      res.status(404).json({ message: `Open positions not found for company id: ${idCompany}` });
    }
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
  getByIdCompany: getByIdCompany,
  add: add,
  edit: edit,
  remove: remove
};