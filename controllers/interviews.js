const fs = require('fs');
const path = require('path');
let interviews = require('../data/interviews.json');

// ---- FUNCTIONS ----
const getLastId = (collection) => {  // Julián fn
    let larger = 0;
    collection.forEach((element) => {
      if (element.id > larger) {
        larger = element.id;
      }
    });
    return larger;
};

const validate = (entity) => {      // Julián fn
    for (let key in entity) {
      if (entity[key] === undefined) {
        return false;
      }
    }
    return true;
};

// ---- PATHS ----

const getAll = (req, res) => {
    res.json(interviews);
};
// try:  http://localhost:8000/interviews

const getById = (req, res) => { 
    const findInterviewsId = interviews.some(interviews => interviews.id === parseInt(req.params.id)); 
    if(findInterviewsId) {
        res.json(interviews.filter(interviews => interviews.id === parseInt(req.params.id)));
    } else {
        res.status(404).json({msg: `Interview not found with the id of ${req.params.id}`});
    }  
};
// as by Traversy  - try: http://localhost:8000/interviews/150

const getByIdCompany = (req, res) => {
    const findIdCompany = interviews.some(interviews => interviews.idCompany === parseInt(req.params.idCompany)); 
    if(findIdCompany) {
        res.json(interviews.filter(interviews => interviews.idCompany === parseInt(req.params.idCompany)));
    } else {
        res.status(404).json({ msg: `Interview not found with the idCompany of ${req.params.idCompany}`});
    }
};

const add = (req, res) => { 
    const newInterviews = {
        id: getLastId(interviews) + 1,
        idCompany: req.query.idCompany,
        idCandidate: req.query.idCandidate,
        date: req.query.date,
        status: req.query.status,
        isActive: req.query.isActive
    };
    if (validate(interviews)) {
        interviews.push(newInterviews)
        fs.writeFile(path.join(__dirname, '../data/interviews.json'), JSON.stringify(interviews), err => {
            if (err) {
            res.send(500).json({ msg: 'Error adding new interview' });
            }
    });
    res.json({ msg: 'New interview successfully added', newInterviews });
    } else {
        res.status(400).json({ msg: 'Some parameters are missing' });
    }
};
// as by David C. - try: http://localhost:8000/interviews/add?id=215&idCompany=215&idCandidate=215&date=11/23/2021&status=true&isActive=true

const edit = (req, res) => {
    const findInterviewsId = interviews.some(interviews => interviews.id === parseInt(req.params.id)); 
    const editInterviews = req.query;
    if(findInterviewsId) {
        interviews.map(interviews => {
            if(interviews.id ===parseInt(req.params.id)) {
                interviews.idCompany = editInterviews.idCompany ? editInterviews.idCompany : interviews.idCompany;
                interviews.idCandidate = editInterviews.idCandidate ? editInterviews.idCandidate : interviews.idCandidate;
                interviews.date = editInterviews.date ? editInterviews.date : interviews.date;
                interviews.status = editInterviews.status ? editInterviews.status : interviews.status;
                interviews.isActive = editInterviews.isActive ? editInterviews.isActive : interviews.isActive;        
            }
        });
        fs.writeFile(path.join(__dirname, '../data/interviews.json'), JSON.stringify(interviews), err => {
            if(err) {
                res.status(500).json({ msg: 'Error editing interview'});
            }
        });
        res.json({ msg: 'Success! The edit of the interview was a success', interviews});
    } else {
        res.status(404).json({msg: `Interview not found with the id of ${req.params.id}`});
    }
};
// as by Traversy  - test: http://localhost:8000/interviews/edit/1?idCandidate=4

const remove = (req, res) => {
    const findInterviewsId = interviews.some(interviews => interviews.id === parseInt(req.params.id));
    if(findInterviewsId) {
        interviews = interviews.filter(interview => interview.id !== parseInt(req.params.id));
        fs.writeFile(path.join(__dirname, '../data/interviews.json'), JSON.stringify(interviews), (err) => {
           if (err) {
               res.status(500).json({ msg: 'Error removing Interview'});
           }
        });
        res.json({ msg: 'Success: Interview removed'});
    } else {
        res.status(404).json({ msg: `Interview not found with the id of ${req.params.id}`});
    } 
};
// as by Traversy 

module.exports = {
  getAll: getAll,
  getById: getById,
  getByIdCompany: getByIdCompany,
  add: add,
  edit: edit,
  remove: remove
};
