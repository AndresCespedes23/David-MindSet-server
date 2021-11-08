const fs = require('fs'); 
const sessions = require('../data/sessions.json');

const getAll = (req, res) => res.json(sessionsData);

const getById = (req, res) => {
    const foundSessions = sessions.list.some(sessions => sessions.id === parseInt(req.params.id));

    if(foundSessions){
        res.json(sessions.list.filter(sessions => sessions.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({msg: `No session with the id of ${req.params.id}`});
    }
};

const getByName = (req, res) => {
    // your code here
};

const add = (req, res) => { 
    let newSession = {
        id: req.params.id,
        idPsychologists: req.params.idPsychologists,
        idCandidate: req.params.idCandidate,
        date: req.params.date,
        time: req.params.time,
        isActive: req.params.isActive
    }
    sessions.list.push(newSession);
    fs.writeFile('../data/sessions.json', JSON.stringify(sessions), err => {
        if (err) { res.send(500) }
    });
    res.json(newSession);
}

const edit = (req, res) => {
    // your code here
};

const remove = (req, res) => {
     // your code here
};

module.exports = {
  getAll: getAll,
  add: add,
  getById: getById,
  getByName: getByName,
  edit: edit,
  remove: remove
};