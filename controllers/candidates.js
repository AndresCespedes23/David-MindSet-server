const fs = require('fs');
let candidates = require('../data/candidates.json');

function getLastID(){
    let lastID = 0;
    candidates.list.forEach(candidate => {
        if (candidate.id > lastID) {
            lastID = candidate.id;
        }
    });
    return lastID;
}
const getAll = (req, res) => {
    res.json({
        message: 'Candidates found',
        candidates: candidates.list
    });
};

const getById = (req, res) => {
    const candidateID = parseInt(req.params.id);
    const foundCandidate = candidates.list.filter(candidate => candidate.id === candidateID);
    if(!foundCandidate){
        res.status(400).json({
            message:'Candidate not found by ID'
        });
    }
    else{
        res.json({
            message: 'Candidate found',
            candidate: foundCandidate
        })
    }
};

const getByName = (req, res) => {
    const foundCandidates = candidates.list.filter(candidate => candidate.firstName.toLowerCase() === req.params.name.toLowerCase())
    if(foundCandidates.length === 0){
        res.status(400).json({
            message:'Candidate not found by FirstName',
            candidates: foundCandidates
        });
    }
    else{
        res.json({
            message: 'Candidate found',
            candidate: foundCandidates
        })
    }
};

const add = (req, res) => {
    let errorMsg = [];
    if (req.query.firstName === undefined){
        errorMsg.push('First Name is required');
    }
    if (req.query.lastName === undefined){
        errorMsg.push('Last Name is required');
    }
    if (req.query.email === undefined){
        errorMsg.push('Email is required');
    }
    if (req.query.password === undefined){
        errorMsg.push('Password is required');
    }
    if (req.query.phone === undefined){
        errorMsg.push('Phone is required');
    }
    if(req.query.address === undefined){
        errorMsg.push('Address is required');
    }
    if(req.query.city === undefined){
        errorMsg.push('City is required');
    }
    if(req.query.province === undefined){
        errorMsg.push('Province is required');
    }
    if(req.query.country === undefined){
        errorMsg.push('Country is required');
    }
    if(req.query.postalCode === undefined){
        errorMsg.push('Postal Code is required');
    }
    if(req.query.birthday === undefined){
        errorMsg.push('Birthday is required');
    }
    if(errorMsg.length !== 0){
        res.status(404).json({
            message: errorMsg
        })
    }
    else{
        let lastID = getLastID();
        const newCandidate = {
            id: lastID + 1,
            firstName: req.query.firstName,
            lastName: req.query.lastName,
            email: req.query.email,
            password: req.query.password,
            pictureUrl: req.query.pictureUrl,
            phone: req.query.phone,
            address: req.query.address,
            city: req.query.city,
            province: req.query.province,
            country: req.query.country,
            postalCode: req.query.postalCode,
            birthday: req.query.birthday,
            education: req.query.education === undefined ? [] : [req.query.education],
            experiences: req.query.experiences === undefined ? [] : [req.query.experiences],
            courses: req.query.courses === undefined ? [] : [req.query.courses] ,
            hobbies: req.query.hobbies === undefined ? [] : [req.query.hobbies] ,
            mainSkills: req.query.mainSkills === undefined ? [] : [req.query.mainSkills] ,
            profileTypes: req.query.profileTypes === undefined ? [] : [req.query.profileTypes] ,
            isOpenToWork: true,
            isActive: true
        }
        candidates.list.push(newCandidate);
        fs.writeFile('./data/candidates.json', JSON.stringify(candidates),err =>{
            if(err){
                res.status(500).json({
                    message:'Error while saving data'
                })
            }
            else{
                res.json({
                    message:'Candidate created',
                    candidate: newCandidate
                })
            }
        })
    }
};

const edit = (req, res) => {
    const candidateID = parseInt(req.params.id)
    const foundCandidate = candidates.list.find(candidate => candidate.id === candidateID);
    if(!foundCandidate){
        res.status(400).json({
            message:'Candidate not found by ID'
        });
    }
    else{
        candidates = candidates.list.map((candidate) => {
            if(candidate.id === candidateID){
                candidate.firstName = req.query.firstName !== undefined ? req.query.firstName : candidate.firstName;
                candidate.lastName = req.query.lastName !== undefined ? req.query.lastName : candidate.lastName;
                candidate.email = req.query.email !== undefined ? req.query.email : candidate.email;
                candidate.password = req.query.password !== undefined ? req.query.password : candidate.password;
                candidate.pictureUrl = req.query.pictureUrl !== undefined ? req.query.pictureUrl : candidate.pictureUrl;
                candidate.phone = req.query.phone !== undefined ? req.query.phone : candidate.phone;
                candidate.address = req.query.address !== undefined ? req.query.address : candidate.address;
                candidate.city = req.query.city !== undefined ? req.query.city : candidate.city;
                candidate.province = req.query.province !== undefined ? req.query.province : candidate.province;
                candidate.country = req.query.country !== undefined ? req.query.country : candidate.country;
                candidate.postalCode = req.query.postalCode !== undefined ? req.query.postalCode : candidate.postalCode;
                candidate.birthday = req.query.birthday !== undefined ? req.query.birthday : candidate.birthday;
                candidate.education = req.query.education !== undefined ? [req.query.education] : candidate.education;
                candidate.experiences = req.query.experiences !== undefined ? [req.query.experiences] : candidate.experiences;
                candidate.courses = req.query.courses !== undefined ? [req.query.courses] : candidate.courses;
                candidate.hobbies = req.query.hobbies !== undefined ? [req.query.hobbies] : candidate.hobbies;
                candidate.mainSkills = req.query.mainSkills !== undefined ? [req.query.mainSkills] : candidate.mainSkills;
                candidate.profileTypes = req.query.profileTypes !== undefined ? [req.query.profileTypes] : candidate.profileTypes;
                candidate.isOpenToWork = req.query.isOpenToWork !== undefined ? req.query.isOpenToWork : candidate.isOpenToWork;
                return candidate;
            }
            else{
                return candidate;
            }
        })
        fs.writeFile('./data/candidates.json', JSON.stringify({list:candidates}),err =>{
            if(err){
                res.status(500).json({
                    message:'Error while saving data'
                })
            }
            else{
                res.json({
                    message: 'Updated Candidate'
                })
            }
        })
    }
};

const remove = (req, res) => {
    const candidateID = parseInt(req.params.id);
    const foundCandidate = candidates.list.filter(candidate => candidate.id === candidateID);
    if(!foundCandidate){
        res.status(400).json({
            message:'Candidate not found by ID'
        });
    }
    else{
        candidates = candidates.list.filter((candidate) => candidate.id !== candidateID);
        fs.writeFile('./data/candidates.json', JSON.stringify({list:candidates}),err =>{
            if(err){
                console.log(err)
                res.status(500).json({
                    message:'Error while saving data'
                })
            }
            else{
                res.json({
                    message: 'Deleted Candidate'
                })
            }
        })
    }
};

module.exports = {
  getAll: getAll,
  getById: getById,
  getByName: getByName,
  add: add,
  edit: edit,
  remove: remove
};