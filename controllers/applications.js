let applications = require('../data/applications.json');
let fs = require('fs');
const path = require('path');

const getLastId = (collection) => {
    let larger = 0;
    collection.forEach((element) => {
        if (element.id > larger) {
            larger = element.id;
        }
    });
    return larger;
};

const validate = (object) => {
    for (let key in object) {
        if (object[key] === undefined) {
            return false;
        }
    }
    return true;
};

const getAll = (req, res) => res.json(applications);

const getById = (req, res) => {
    const id = parseInt(req.params.id);
    const application = applications.find((applications) => applications.id === id);
    if (application === undefined) {
        return res.status(404).json({ message: `no application with id: ${id}` });
    }
    res.json(application);
};

const getByPosition = (req, res) => {
    const id = parseInt(req.params.id);
    const application = applications.filter((applications) => applications.idOpenPosition === id);
    if (application === undefined) {
        return res.status(404).json({ message: `no applications with open position id: ${id}` });
    }
    res.json(application);
};

const getByCandidate = (req, res) => {
    const id = parseInt(req.params.id);
    const application = applications.filter((applications) => applications.idCandidate === id);
    if (application === undefined) {
        return res.status(404).json({ message: `no applications with candidate id: ${id}` });
    }
    res.json(application);
};

const add = (req, res) => {
    let newId = getLastId(applications) + 1;
    let newItem = {
        id: newId,
        idCandidate: req.query.idCandidate,
        idOpenPosition: req.query.idOpenPosition,
        isActive: true
    }
    if (!validate(newItem)) {
        return res.status(400).json({ message: 'no data in query' });
    }
    applications.push(newItem);
    fs.writeFile(path.join(__dirname, '../data/applications.json'), JSON.stringify(applications), (err) => {
        if (error) { return res.status(500).json({ message: 'error adding application' }) };
        res.json({ message: 'Application added' });
    })
};

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
            return editObj;
        }
    });
    fs.writeFile(path.join(__dirname, '../data/applications.json'), JSON.stringify(applications), (err) => {
        if (error) { return res.status(500).json({ message: 'error editing application' }) };
        res.json({ message: 'Application added' });
    });
};

const remove = (req, res) => {
    const id = parseInt(req.params.id);
    let remObj = applications.find((applications) => applications.id === id);
    if (remObj == null) {
        return res.status(400).json({ message: `no application with id: ${id}` });
    }
    const newList = applications.filter((applications) => applications.id !== id);
    fs.writeFile(path.join(__dirname, '../data/applications.json'), JSON.stringify(applications), (err) => {
        if (error) { return res.status(500).json({ message: 'error deleting application' }) };
        res.json({ message: 'Application deleted' });
    });
};

module.exports = {
    getAll: getAll,
    getById: getById,
    getByPosition: getByPosition,
    getByCandidate: getByCandidate,
    add: add,
    edit: edit,
    remove: remove
};
