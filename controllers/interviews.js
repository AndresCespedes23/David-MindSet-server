const fs = require('fs');
const path = require('path');
/* const interviews = require('../data/interviews.json'); */

const validate = (object) => {
  for (let key in object) {
    if (object[key] === undefined) {
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

// ---- PATHS FN ----

// test: http://localhost:8000/interviews
const getAll = (req, res) => {
  res.json(interviews);
};

// test: http://localhost:8000/interviews/150
const getById = (req, res) => {
  const id = parseInt(req.params.id);
  const interviewFound = interviews.find((interviews) => interviews.id === id);
  if (!interviewFound) {
    return res.status(404).json({ message: `Interview not found with the id of ${id}` });
  }
  res.json(interviewFound);
};

const getByCompany = (req, res) => {
  const idCompany = parseInt(req.params.idCompany);
  const interviewFound = interviews.filter((interviews) => interviews.idCompany === idCompany);
  if (!interviewFound) {
    return res.status(404).json({ message: `Interview not found with the idCompany of ${idCompany}` });
  }
  res.json(interviewFound);
};

// test: http://localhost:8000/interviews/add?id=215&idCompany=215&idCandidate=215&date=11/23/2021&status=true&isActive=true
const add = (req, res) => {
  const newInterviews = {
    id: getLastId(interviews) + 1,
    idCompany: req.query.idCompany,
    idCandidate: req.query.idCandidate,
    date: req.query.date,
    status: req.query.status,
    isActive: req.query.isActive,
  };
  if (!validate(newInterviews)) {
    return res.status(400).json({ message: 'Missing parameters' });
  }
  interviews.push(newInterviews);
  fs.writeFile(path.join(__dirname, '../data/interviews.json'), JSON.stringify(interviews), (err) => {
    if (err) {
      return res.send(500).json({ message: 'Error adding new interview' });
    }
    res.json({ message: 'New interview added successfully', interview: newInterviews });
  });
};

// test: http://localhost:8000/interviews/edit/1?idCandidate=4
const edit = (req, res) => {
  const id = parseInt(req.params.id);
  const interviewFound = interviews.find((interviews) => interviews.id === id);
  if (!interviewFound) {
    return res.status(404).json({ message: `Interview not found with the id of ${id}` });
  }
  interviews = interviews.map((interview) => {
    if (interview.id === id) {
      interview.idCompany = req.query.idCompany || interview.idCompany;
      interview.idCandidate = req.query.idCandidate || interview.idCandidate;
      interview.date = req.query.date || interview.date;
      interview.status = req.query.status || interview.status;
      interview.isActive = req.query.isActive || interview.isActive;
    }
    return interview;
  });
  fs.writeFile(path.join(__dirname, '../data/interviews.json'), JSON.stringify(interviews), (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error editing interview' });
    }
    res.json({ message: 'Interview edited successfully', interviewFound });
  });
};

const remove = (req, res) => {
  const id = parseInt(req.params.id);
  const interviewFound = interviews.find((interviews) => interviews.id === id);
  if (!interviewFound) {
    return res.status(404).json({ message: `Interview not found with the id of ${id}` });
  }
  interviews = interviews.filter((interview) => interview.id !== id);
  fs.writeFile(path.join(__dirname, '../data/interviews.json'), JSON.stringify(interviews), (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error deleting interview' });
    }
    res.json({ message: 'Interview deleted' });
  });
};

module.exports = {
  getAll: getAll,
  getById: getById,
  getByCompany: getByCompany,
  add: add,
  edit: edit,
  remove: remove,
};
