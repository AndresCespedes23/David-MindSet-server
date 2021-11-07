const fs = require('fs');   // to step on json
const interviews = require('../data/interviews.json');


const getAll = (req, res) => {      // http://localhost:8000/interviews
    res.json(interviews);
};


const getById = (req, res) => {     // as by Traversy  - http://localhost:8000/interviews/150
    res.json(interviews.filter(interviews => interviews.id === parseInt(req.params.id)))
    
};

/*
const getByName = (req, res) => {
    // your code here
};
*/

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
  //getByName: getByName,
  add: add,
  edit: edit,
  remove: remove
};