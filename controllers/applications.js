const applications = require('../data/applications.json');


const getAll = (req, res) => {
    res.json(applications);
};

const getById = (req, res) => {
    const id = parseInt(req.params.id);
    const application = applications.find((applications) => applications.id === id);
    if(application === undefined){
        res.status(404).json({message : `no application with id: ${id}`});
    }
    else{
        res.json(application);
    }
};

const getByIdPos = (req, res) => {
    const id = parseInt(req.params.id);
    console.log(id);
    const application = applications.find((applications) => applications.idOpenPosition === id);
    if(application === undefined){
        res.status(404).json({message : `no application with open position id: ${id}`});
    }
    else{
        res.json(application);
    }
};

const getByIdCan = (req, res) => {
    const id = parseInt(req.params.id);
    console.log(id);
    const application = applications.find((applications) => applications.idCandidate === id);
    if(application === undefined){
        res.status(404).json({message : `no application with candidate id: ${id}`});
    }
    else{
        res.json(application);
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
  getByIdPos: getByIdPos,
  getByIdCan: getByIdCan,
  add: add,
  edit: edit,
  remove: remove
};