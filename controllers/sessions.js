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

// PATH FUNCTIONS based on julianv97
const getLastId = (collection) => {  
    let larger = 0;
    collection.forEach((element) => {
      if (element.id > larger) {
        larger = element.id;
      }
    });
    return larger;
};

const getAll = (req, res) => res.json(sessions);

const getById = (req, res) => {
  const id = parseInt(req.params.id);
  const sessionFound = sessions.find((session) => session.id === id);
  if (!sessionFound) {
    return res.status(404).json({ message: `Session not found with id: ${id}` });
  }
  res.json(sessionFound);
};

const getByIdCandidate = (req, res) => {
  const idCandidate = req.params.idCandidate;
  const sessionFound = sessions.filter((session) => session.idCandidate === idCandidate);
  if (sessionFound.length <= 0) {
    return res.status(404).json({ message: `Session not found with the ID: ${idCandidate}` });
  }
  res.json(sessionFound);
};

const add = (req, res) => {
    const newSession = {
      id: getLastId(sessions) + 1,
      idPsychologists: req.query.idPsychologists,
      idCandidate: req.query.idCandidate,
      date: req.query.date,
      time: req.query.time,
      isActive: req.query.isActive,
    };
    if (!validate(newSession)) {
      return res.status(400).json({ message: 'Missing parameters' });
    }
    sessions.push(newSession);
    fs.writeFile(path.join(__dirname, '../data/sessions.json'), JSON.stringify(sessions), (err) => {
      if (err) {
        res.status(500).json({ message: 'Error adding a session' });
        return;
      }
      res.json({ message: 'Session added successfully', session: newSession });
    });
  };

  const edit = (req, res) => {
    const id = parseInt(req.params.id);
    const sessionFound = sessions.list.find((session) => session.id === id);
    if (!sessionFound) {
      return res.status(404).json({ message: `Session not found with id ${id}` });
    }
    sessions = sessions.list.map((session) => {
      if (session.id === id) {
        session.idPsychologists = req.query.idPsychologists || session.idPsychologists;
        session.idCandidate = req.query.idCandidate || session.idCandidate;
        session.date = req.query.date || session.date;
        session.time = req.query.time || session.time;
        session.isActive = req.query.isActive || session.isActive;
      }
      return session;
    });
    fs.writeFile(path.join(__dirname, '../data/session.json'), JSON.stringify(sessions), (err) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: 'Error editing session' });
        return;
      }
      res.json({ message: 'Session edited successfully', sessionFound });
    });
  };
  
const remove = (req, res) => {
    const id = parseInt(req.params.id);
    const sessionFound = sessions.list.find((session) => session.id === id);
    if (!sessionFound) {
      return res.status(404).json({ message: `Session not found with id ${id}` });
    }
    sessions = sessions.filter((session) => session.id !== id);
    fs.writeFile(path.join(__dirname, '../data/sessions.json'), JSON.stringify(sessions), (err) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: 'Error deleting the session' });
        return;
      }
      res.json({ message: 'Session deleted' });
    });
  };

module.exports = {
  getAll: getAll,
  getByIdCandidate: getByIdCandidate,
  add: add,
  getById: getById,
  edit: edit,
  remove: remove
};