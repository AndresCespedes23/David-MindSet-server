let applications = require('../data/applications.json');


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
    const application = applications.filter((applications) => applications.idOpenPosition === id);
    if(application === undefined){
        res.status(404).json({message : `no applications with open position id: ${id}`});
    }
    else{
        res.json(application);
    }
};

const getByIdCan = (req, res) => {
    const id = parseInt(req.params.id);
    console.log(id);
    const application = applications.filter((applications) => applications.idCandidate === id);
    if(application === undefined){
        res.status(404).json({message : `no application with candidate id: ${id}`});
    }
    else{
        res.json(application);
    }
};

const add = (req, res) => {
    let valid = req.query.idOpenPosition === undefined ? undefined : req.query.idCandidate === undefined ? undefined : true;
    let newId = applications[applications.length - 1].id + 1;
    let newItem ={
        id : newId,
        idCandidate : req.query.idCandidate,
        idOpenPosition : req.query.idOpenPosition,
        isActive : true
    }
    if(valid){
        applications.push(newItem);
        console.log(newItem);
    }
    else{
        console.log("error");
    }
};

const edit = (req, res) => {
    
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