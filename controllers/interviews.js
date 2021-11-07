const fs = require('fs');                // to step on json
const interviews = require('../data/interviews.json');
//git push origin ft-interviews-controller

const getAll = (req, res) => {          // try:  http://localhost:8000/interviews
    res.json(interviews);
};

// try: http://localhost:8000/interviews/add?id=215&idCompany=215&idCandidate=215&date=11/23/2021&status=true&isActive=true
const add = (req, res) => { 
    const newInterviews = {
        id: req.query.id,
        idCompany: req.query.idCompany,
        idCandidate: req.query.idCandidate,
        date: req.query.date,
        status: req.query.status,
        isActive: req.query.isActive
    };
    // if validation 
    interviews.push(newInterviews);
    fs.writeFile('./data/interviews.json', JSON.stringify(interviews), err => {
        if (err) { res.send(500); }
});
    res.json(newInterviews);
    console.log(req.query); // to check if i'm doing it rigth

}


const getById = (req, res) => {                   // as by Traversy  - try: http://localhost:8000/interviews/150
    const findInterviewsId = interviews.some(interviews => interviews.id ===
        parseInt(req.params.id)); 
    if(findInterviewsId) {
    res.json(interviews.filter(interviews => interviews.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({msg: `Interview not found with the id of ${req.params.id}`});
    }  
};

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
        res.json({ msg: 'Success! The edit of the interview was a success', interviews});
        fs.writeFile('./data/interviews.json', JSON.stringify(interviews), err => {
            if(err) {res.status(500);}
        })
    } else {
        res.status(404).json({msg: `Interview not found with the id of ${req.params.id}`});
    }
};



/*
// follow fn update of Traversy and the fn add of David  - try: http://localhost:8000/interviews/edit
// INTENTO FALLIDO Y DESARREGLADO 
const edit = (req, res) => {        
    const findInterviewsId = interviews.some(interviews => interviews.id === parseInt(req.query.id)); 
    const editInterviews = req.query;
    if(findInterviewsId) {
        interviews.map(interviews => {
            if(interviews.id ===parseInt(req.query.id)) {
                interviews.idCompany = editInterviews.idCompany ? editInterviews.idCompany : interviews.idCompany;
                interviews.idCandidate = editInterviews.idCandidate ? editInterviews.idCandidate : interviews.idCandidate;
                interviews.date = editInterviews.date ? editInterviews.date : interviews.date;
                interviews.status = editInterviews.status ? editInterviews.status : interviews.status;
                interviews.isActive = editInterviews.isActive ? editInterviews.isActive : interviews.isActive;        
            fs.writeFile('./data/interviews.json', JSON.stringify(interviews), err => {
            if (err) { res.send(500); }
        });
        interviews.push(editInterviews);
        res.json({ msg: 'Success! The edit of the interview was a success', newInterviews});
    } else {
        res.status(404).json({msg: `Interview not found with the id of ${req.query.id}`});
    }
};*/







const remove = (req, res) => {
    // your code here
};

module.exports = {
  getAll: getAll,
  add: add,
  getById: getById,
  edit: edit,
  remove: remove
  //getByName: getByName,
};


//const getByName = (req, res) => {
    // your code here
//};