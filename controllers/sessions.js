const fs = require('fs'); 
const path = require('path');
const sessions = require('../data/sessions.json');

// VALIDATION FUNCTIONS

const validate = (entity) => {      
    for (let key in entity) {
      if (entity[key] === undefined) {
        return false;
      }
    }
    return true;
};

const getLastId = (collection) => {  
    let larger = 0;
    collection.forEach((element) => {
      if (element.id > larger) {
        larger = element.id;
      }
    });
    return larger;
};

// PATH FUNCTIONS

const getAll = (req, res) => res.json(sessions);

const getById = (req, res) => {
    const foundSessions = sessions.list.some(sessions => sessions.id === parseInt(req.params.id));

    if(foundSessions){
        res.json(sessions.list.filter(sessions => sessions.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({msg: `No session with the id of ${req.params.id}`});
    }
};

const getByIdCandidate = (req, res) => {
    const findIdCandidate = sessions.list.some(sessions => sessions.idCandidate === parseInt(req.params.idCandidate)); 
    if(findIdCandidate) {
    res.json(sessions.list.filter(sessions => sessions.idCandidate === parseInt(req.params.idCandidate)));
    } else {
        res.status(400).res.json({msg: `Candidate ID not found ${req.params.idCandidate}`});
    }
};

const add = (req, res) => { 
    let newSession = {
        id: req.query.id,
        idPsychologists: req.query.idPsychologists,
        idCandidate: req.query.idCandidate,
        date: req.query.date,
        time: req.query.time,
        isActive: req.query.isActive
    }
    sessions.list.push(newSession);
    fs.writeFile('./data/sessions.json', JSON.stringify(sessions), err => {
        if (err) { res.send(500) }
    });
    res.json(newSession);
}

const edit = (req, res) => {
    const findSessions = sessions.list.some(sessions => sessions.id === parseInt(req.params.id)); 
    const editSessions = req.query;
    if(findSessions) {
        sessions.list.map(sessions => {
            if(sessions.id === parseInt(req.params.id)) {
                sessions.idPsychologists = editSessions.idPsychologists ? editSessions.idPsychologists : sessions.idPsychologists;
                sessions.idCandidate = editSessions.idCandidate ? editSessions.idCandidate : sessions.idCandidate;
                sessions.date = editSessions.date ? editSessions.date : sessions.date;
                sessions.time = editSessions.time ? editSessions.time : sessions.time;
                sessions.isActive = editSessions.isActive ? editSessions.isActive : sessions.isActive;        
            }
        });
        res.json({ msg: 'Success! You have change the content of the session', sessions});
        fs.writeFile('./data/sessions.json', JSON.stringify(sessions), err => {
            if(err) {res.status(500)}
        })
    } else {
        res.status(404).json({msg: `Session with the id of ${req.params.id} not found`});
    }
};

const remove = (req, res) => {
   const findSessions = sessions.list.some(sessions => sessions.id === parseInt(req.params.id));
   if(findSessions) {
       sessions.list.filter(sessions => sessions.id !== parseInt(req.params.id));
       fs.writeFile('./data/sessions.json', JSON.stringify(sessions), (err) => {
          if (err) {
              res.status(500).json({ msg: 'Error removing the session'});
          }
       });
       res.json({ msg: 'Session removed'});
   } else {
       res.status(404).json({ msg: `Session not found with the id of ${req.params.id}`});
   } 
};

module.exports = {
  getAll: getAll,
  getByIdCandidate: getByIdCandidate,
  add: add,
  getById: getById,
  edit: edit,
  remove: remove
};