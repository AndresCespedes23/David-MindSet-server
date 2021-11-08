let applications = require('../data/applications.json');
applications.sort((a, b) => a.id - b.id);

const getAll = (req, res) => {
    res.json(applications);
};

const getById = (req, res) => {
    const id = parseInt(req.params.id);
    const application = applications.find((applications) => applications.id === id);
    if (application === undefined) {
        res.status(404).json({ message: `no application with id: ${id}` });
    }
    else {
        res.json(application);
    }
};

const getByIdPos = (req, res) => {
    const id = parseInt(req.params.id);
    console.log(id);
    const application = applications.filter((applications) => applications.idOpenPosition === id);
    if (application === undefined) {
        res.status(404).json({ message: `no applications with open position id: ${id}` });
    }
    else {
        res.json(application);
    }
};

const getByIdCan = (req, res) => {
    const id = parseInt(req.params.id);
    console.log(id);
    const application = applications.filter((applications) => applications.idCandidate === id);
    if (application === undefined) {
        res.status(404).json({ message: `no application with candidate id: ${id}` });
    }
    else {
        res.json(application);
    }
};

const add = (req, res) => {
    let valid = req.query.idOpenPosition === undefined ? undefined : req.query.idCandidate === undefined ? undefined : true;
    let newId = applications[applications.length - 1].id + 1;
    let newItem = {
        id: newId,
        idCandidate: req.query.idCandidate,
        idOpenPosition: req.query.idOpenPosition,
        isActive: true
    }
    if (valid) {
        applications.push(newItem);
    }
    else {
    }
    res.json(newItem);
    fs.writeFile('./data/applications.json', JSON.stringify(applications), error => {
        if (error) { res.status(500) }
    })
};

const edit = (req, res) => {
    const id = parseInt(req.query.id);
    let editObj = applications.find((applications) => applications.id === id);
    if (editObj) {
        applications.map((editObj) => {
            if (applications.id === id) {
                editObj.idCandidate = req.query.idCandidate === undefined ? editObj.idCandidate : parseInt(req.query.idCandidate);
                editObj.idOpenPosition = req.query.idOpenPosition === undefined ? editObj.idOpenPosition : parseInt(req.query.idOpenPosition);
                editObj.isActive = req.query.isActive === undefined ? editObj.isActive : editObj.isActive == req.query.isActive ? editObj.isActive : !editObj.isActive;
                return editObj;
            }
            return editObj;
        })

    }
    res.json(editObj);
    fs.writeFile('./data/applications.json', JSON.stringify(applications), error => {
        if (error) { res.status(500) }
    })
};

const remove = (req, res) => {

};

module.exports = {
    getAll: getAll,
    getById: getById,
    getByIdPos: getByIdPos,
    getByIdCan: getByIdCan,
    add: add,
    edit: edit,
    remove: remove
};