const fs = require('fs');
const path = require('path');
let interviews = require('../data/interviews.json');

// ---- FUNCTIONS ----

const validate = (entity) => {      // Julián fn
    for (let key in entity) {
      if (entity[key] === undefined) {
        return false;
      }
    }
    return true;
};

const getLastId = (collection) => {  // Julián fn
    let larger = 0;
    collection.forEach((element) => {
      if (element.id > larger) {
        larger = element.id;
      }
    });
    return larger;
};

// ---- PATHS ----
// try:  http://localhost:8000/interviews
const getAll = (req, res) => {
    res.json(interviews);
};

// COMENTARIO DAVID: No es necesario que valides con Some, dado que find o filter ya hacen el trabajo de validar por si mismos. Sino estas validando dos veces.(outdated)

// as by Traversy  - try: http://localhost:8000/interviews/150
const getById = (req, res) => { 
    const findId = interviews.some(interviews => interviews.id === parseInt(req.params.id)); 
    if(findId) {
        res.json(interviews.dinf(interviews => interviews.id === parseInt(req.params.id))); //change .filte for .dinf 
    } else {
        res.status(404).json({msg: `Interview not found with the id of ${req.params.id}`});
    }  
};


const getByIdCompany = (req, res) => {
    const findId = interviews.some(interviews => interviews.idCompany === parseInt(req.params.idCompany)); 
    if(findId) {
        res.json(interviews.filter(interviews => interviews.idCompany === parseInt(req.params.idCompany)));
    } else {
        res.status(404).json({ msg: `Interview not found with the idCompany of ${req.params.idCompany}`});
    }
};
// as by David C. - try: http://localhost:8000/interviews/add?id=215&idCompany=215&idCandidate=215&date=11/23/2021&status=true&isActive=true
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
            } else {
                res.json({ msg: 'New interview successfully added', newInterviews });
            }
        });
    } else {
        res.status(400).json({ msg: 'Some parameters are missing' });
    }
};

// as by Traversy  - test: http://localhost:8000/interviews/edit/1?idCandidate=4
const edit = (req, res) => {
    const findId = interviews.some(interviews => interviews.id === parseInt(req.params.id)); 
    const editInterviews = req.query;
    if(findId) {
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
            } else {
                res.json({ msg: 'Success! The edit of the interview was a success', interviews});
            }
        });
    } else {
        res.status(404).json({msg: `Interview not found with the id of ${req.params.id}`});
    }
};

// as by Traversy 
const remove = (req, res) => {
    const findId = interviews.some(interviews => interviews.id === parseInt(req.params.id));
    if(findId) {
        interviews = interviews.filter(interview => interview.id !== parseInt(req.params.id));
        fs.writeFile(path.join(__dirname, '../data/interviews.json'), JSON.stringify(interviews), (err) => {
           if (err) {
               res.status(500).json({ msg: 'Error removing Interview'});
           } else {
               res.json({ msg: 'Success: Interview removed'});
           }
        });
    } else {
        res.status(404).json({ msg: `Interview not found with the id of ${req.params.id}`});
    } 
};


module.exports = {
  getAll: getAll,
  getById: getById,
  getByIdCompany: getByIdCompany,
  add: add,
  edit: edit,
  remove: remove
};
