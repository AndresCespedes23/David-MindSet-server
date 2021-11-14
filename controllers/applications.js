let fs = require('fs');
const path = require('path');
const Applications = require('../models/Applications');

const getAll = (req, res) => {
    Applications.find()
        .then((applications) => {
            return res.json({applications})
        })
        .catch((err) => {
            return res.status(400).json(err)
        })
};

const getByCandidate = (req, res) => {
    const { id } = req.params;
    Applications.find({ idCandidate: id })
    .then((data) => {
        if (data.length === 0) {
            return res.status(404).json({ msg: `Candidate not found by Candidate ID: ${id}` });
        }
        return res.json ({ data });
    })
    .catch((err) => res.status(400).json({ msg: `Error: ${err}` }));
};

const getByPosition = (req, res) => {
    const { id } = req.params;
    Applications.find({ idPosition: id })
    .then((data) => {
        if (data.length === 0) {
            return res.status(404).json({ msg: `Position not found by Position ID: ${id}` });
        }
        return res.json ({ data });
    })
    .catch((err) => res.status(400).json({ msg: `Error: ${err}` }));
};


const add = (req, res) => {
    const newApplication = new Application({
      idCandidate: req.body.idCandidate,
      idPosition: req.body.idPosition,
      isActive: true,
    });
    newApplication
      .save()
      .then((data) => res.json({ msg: 'Application added', data }))
      .catch((err) => res.status(400).json({ msg: `Error: ${err}` }));
  };
/*
const edit = (req, res) => {
    const id = parseInt(req.params.id);
    if (!id) {
        return res.status(400).json({ message: 'no id provided' }); //this line will never run
    }
    let editObj = applications.find((applications) => applications.id === id);
    if (editObj === null) {
        return res.status(404).json({ message: `no application with id: ${id}` });
    }
    applications.map((obj) => {
        if (applications.id === id) {
            editObj.idCandidate = editObj.idCandidate || parseInt(req.query.idCandidate);
            editObj.idOpenPosition = editObj.idOpenPosition || parseInt(req.query.idOpenPosition);
            editObj.isActive = editObj.isActive || req.query.isActive;
        }
        return editObj;
    });
    fs.writeFile(path.join(__dirname, '../data/applications.json'), JSON.stringify(applications), (err) => {
        if (err) {
            return res.status(500).json({ message: 'error editing application' })
        };
        res.json({ message: 'Application edited' });
    });
};

const remove = (req, res) => {
    const id = parseInt(req.params.id);
    let remObj = applications.find((applications) => applications.id === id);
    if (remObj === null) {
        return res.status(400).json({ message: `no application with id: ${id}` });
    }
    const newList = applications.filter((applications) => applications.id !== id);
    fs.writeFile(path.join(__dirname, '../data/applications.json'), JSON.stringify(applications), (err) => {
        if (err) {
            return res.status(500).json({ message: 'error deleting application' }) 
        };
        res.json({ message: 'Application deleted' });
    });
};*/

module.exports = {
    getAll: getAll,
    //getById: getById,
    getByPosition: getByPosition,
    getByCandidate: getByCandidate,
    add: add,
    //edit: edit,
   // remove: remove
};
