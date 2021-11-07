const sessionsData = require('../data/sessions.json');

const getAll = (req, res) => res.json(sessionsData);

const getById = (req, res) => {
    const found = sessionsData.some(session => session.id === parseInt(req.params.id));

    if(found){
        res.json(sessionsData.filter(session => session.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({msg: `No session with the id of ${req.params.id}`});
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