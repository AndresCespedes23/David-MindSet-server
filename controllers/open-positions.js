const fs = require('fs');
let openPositions = require('../data/open-positions.json');

const getLastId = (openPositions) => {
    let biggerId = 0;
    openPositions.forEach(openPosition => {
        if(openPosition.id > biggerId) {
            biggerId = openPosition.id;
        }
    });
    return biggerId;
};

const getAll = (req, res) => res.json(openPositions);

const getById = (req, res) => {
    const id = parseInt(req.params.id);
    const openPosition = openPositions.find((openPosition) => openPosition.id === id);
    if (!openPosition) {
        return res.status(404).json({ message: `Open position not found with id: ${id}` });
    }
};

const getByIdCompany = (req, res) => {
    const idCompany = parseInt(req.params.idCompany);
    const openPosition = openPositions.filter((openPosition) => openPosition.idCompany === idCompany);
    if (openPosition) {
      res.json(openPosition);
    } else {
      res.status(404).json({ message: `Open positions not found for company id: ${idCompany}` });
    }
};

const add = (req, res) => {
    const newOpenPosition = {
        id: getLastId(openPositions) + 1,
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
    fs.writeFile(path.join(__dirname, '../data/open-positions.json'), JSON.stringify(openPositions), (err) => {
        if (err) {
            res.status(500).json({ message: 'Error adding open position' });
        } else {
            res.json(newOpenPosition);
        }
    });
};

const edit = (req, res) => {
    let openPosition = openPositions.find(openPositions => openPositions.id === parseInt(req.params.id));
    if (openPosition) {
        openPositions = openPositions.map(openPosition => {
            if(openPosition.id === parseInt(req.params.id)) {
                openPosition.idCompany = req.query.idCompany || openPosition.idCompany;
                openPosition.startDate = req.query.startDate || openPosition.startDate;
                openPosition.endDate = req.query.endDate || openPosition.endDate;
                openPosition.jobDescription = req.query.jobDescription || openPosition.jobDescription;
                openPosition.isActive = req.query.isActive || openPosition.isActive;
                return openPosition;
            }
            return openPosition;
        });
        fs.writeFile(path.join(__dirname, '../data/open-positions.json'), JSON.stringify(openPositions), (err) => {
            if (err) {
                console.log(err);
                res.status(500).json({ message: 'Error editing open position' });
            }
        });
        res.json({ message: 'Success! Position edited', openPosition });
    } else {
        res.status(404).json({ message: `The open position wasn't found with id: ${req.params.id}` });
    }
};

const remove = (req, res) => {
    const id = parseInt(req.params.id);
    let openPositionSelected = openPositions.find( openPosition => openPosition.id === id );
    if(openPositionSelected) {
        openPositions = openPositions.filter( openPosition => openPosition.id !== id );
        res.json({ message: `Open position id ${id} deleted` });
        fs.writeFile(path.join(__dirname, '../data/open-positions.json'), JSON.stringify(openPositions), (err) => {
            if (err) {
                console.log(err);
                res.status(500).json({ message: 'Error trying to delete the open position' });
            }
        });
    } else {
        res.status(404).json({ message: `Open position wasn't found with id ${id}` });
    }
};

module.exports = {
  getAll: getAll,
  getById: getById,
  getByIdCompany: getByIdCompany,
  add: add,
  edit: edit,
  remove: remove
};