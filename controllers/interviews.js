const fs = require('fs');                                          // to step on json
const interviews = require('../data/interviews.json');
//git push origin ft-interviews-controller

const getAll = (req, res) => {                                     // http://localhost:8000/interviews
    res.json(interviews);
};

// as David C.   - http://localhost:8000/interviews/add?id=215&idCompany=215&idCandidate=215&date=11/23/2021&status=true&isActive=true
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



/*
NODE DVS 
fs.writeFile('/Users/joe/test.txt', content, err => {
  if (err) {
    console.error(err)
    return
  }
  //file written successfully
})
*/



const getById = (req, res) => {                   // as by Traversy  - http://localhost:8000/interviews/byId/150
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
  //getByName: getByName,
  edit: edit,
  remove: remove
};