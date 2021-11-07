const fs = require('fs');                                          // to step on json
const interviews = require('../data/interviews.json');


const getAll = (req, res) => {                                     // http://localhost:8000/interviews
    res.json(interviews);
};


const getById = (req, res) => {                                // as by Traversy  - http://localhost:8000/interviews/150
    const findInterviewsId = interviews.some(interviews => interviews.id ===
        parseInt(req.params.id)); 
    if(findInterviewsId) {
    res.json(interviews.filter(interviews => interviews.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({msg: `Interview not found with the id of ${req.params.id}`});
    }
    
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