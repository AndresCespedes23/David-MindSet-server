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
    const findSessions = sessions.some(sessions => sessions.id === parseInt(req.params.id)); 
    const editSessions = req.query;
    if(findSessions) {
        sessions.map(sessions => {
            if(sessions.id ===parseInt(req.params.id)) {
                sessions.idPsychologists = editSessions.idPsychologists ? editSessions.idPsychologists : sessions.idPsychologists;
                sessions.idCandidate = editSessions.idCandidate ? editSessions.idCandidate : sessions.idCandidate;
                sessions.date = editSessions.date ? editSessions.date : sessions.date;
                sessions.time = editSessions.time ? editSessions.time : sessions.time;
                sessions.isActive = editSessions.isActive ? editSessions.isActive : sessions.isActive;        
            }
        });
        res.json({ msg: 'Success! You have change the content of the session', sessions});
        fs.writeFile('../data/sessions.json', JSON.stringify(sessions), err => {
            if(err) {res.status(500);}
        })
    } else {
        res.status(404).json({msg: `Session with the id of ${req.params.id} not found`});
    }
};

const remove = (req, res) => {
   const findSessions = sessions.some(sessions => sessions.id === parseInt(req.params.id));
   if(findSessions) {
       sessions = sessions.filter(sessions => sessions.id !== parseInt(req.params.id));
       fs.writeFile('../data/sessions.json', JSON.stringify(sessions), (err) => {
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
  add: add,
  getById: getById,
  getByName: getByName,
  edit: edit,
  remove: remove
};