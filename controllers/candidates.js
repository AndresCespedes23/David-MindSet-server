const candidates = require('../data/candidates.json');

const getAll = (req, res) => {
    res.json(candidates);
};

const getById = (req, res) => {
    const foundCandidate = candidates.list.some(candidate => candidate.id === parseInt(req.params.id));
    if(!foundCandidate){
        res.status(400).json({
            ok:false,
            msg:'Candidate not found by ID'
        });
    }
    res.json(candidates.list.filter(candidate => candidate.id === parseInt(req.params.id)))
};

const getByName = (req, res) => {
    const foundCandidate = candidates.list.some(candidate => candidate.firstName.toLowerCase() === req.params.name.toLowerCase());
    if(!foundCandidate){
        res.status(400).json({
            ok:false,
            msg:'Candidate not found by FirstName'
        });
    }
    res.json(candidates.list.filter(candidate => candidate.firstName.toLowerCase() === req.params.name.toLowerCase()))
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