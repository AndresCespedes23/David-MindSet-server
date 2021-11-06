const fs = require('fs');
const candidates = require('../data/candidates.json');

const getAll = (req, res) => {
    res.json({
        ok: true,
        msg: 'Candidates found',
        candidates: candidates.list
    });
};

const getById = (req, res) => {
    const foundCandidate = candidates.list.some(candidate => candidate.id === parseInt(req.params.id));
    if(!foundCandidate){
        res.status(400).json({
            ok:false,
            msg:'Candidate not found by ID'
        });
    }
    else{
        res.json({
            ok: true,
            msg: 'Candidate found',
            candidate: candidates.list.filter(candidate => candidate.id === req.params.id)
        })
    }
};

const getByName = (req, res) => {
    const foundCandidate = candidates.list.some(candidate => candidate.firstName.toLowerCase() === req.params.name.toLowerCase());
    if(!foundCandidate){
        res.status(400).json({
            ok:false,
            msg:'Candidate not found by FirstName'
        });
    }
    res.json({
        ok: true,
        msg: 'Candidate found',
        candidate: candidates.list.filter(candidate => candidate.firstName.toLowerCase() === req.params.name.toLowerCase())
    })
};

const add = (req, res) => {
    //VER COMO ASIGNAR LOS BOOLEANO
    //VER COMO ASIGNAR LOS ARREGLOS
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
            ok: false,
            msg: errorMsg
        })
    }
    else{
        let lastID = 0;
        candidates.list.forEach(candidate => {
            if (candidate.id > lastID) {
                lastID = candidate.id;
            }
        });
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
            education: req.query.education,
            experiences: req.query.experiences,
            courses: req.query.courses,
            hobbies: req.query.hobbies,
            mainSkills: req.query.mainSkills,
            profileTypes: req.query.profileTypes,
            isOpenToWork: req.query.isOpenToWork,
            isActive: req.query.isActive
        }
        candidates.list.push(newCandidate);
        fs.writeFile('../data/candidates.json', JSON.stringify(candidates),err =>{
            if(err){
                res.status(500).json({
                    ok:false,
                    msg:'Error while saving data'
                })
            }
        })
        res.json({
            ok: true,
            msg:'Candidate created',
            candidate: newCandidate
        })
    }
};

const edit = (req, res) => {
    const foundCandidate = candidates.list.some(candidate => candidate.id === parseInt(req.params.id));
    if(!foundCandidate){
        res.status(400).json({
            ok:false,
            msg:'Candidate not found by ID'
        });
    }
    else{
            foundCandidate.firstName = req.query.firstName !== undefined ? req.query.firstName : foundCandidate.firstName;
            foundCandidate.lastName = req.query.lastName !== undefined ? req.query.lastName : foundCandidate.lastName;
            foundCandidate.email = req.query.email !== undefined ? req.query.email : foundCandidate.email;
            foundCandidate.password = req.query.password !== undefined ? req.query.password : foundCandidate.password;
            foundCandidate.pictureUrl = req.query.pictureUrl !== undefined ? req.query.pictureUrl : foundCandidate.pictureUrl;
            foundCandidate.phone = req.query.phone !== undefined ? req.query.phone : foundCandidate.phone;
            foundCandidate.address = req.query.address !== undefined ? req.query.address : foundCandidate.address;
            foundCandidate.city = req.query.city !== undefined ? req.query.city : foundCandidate.city;
            foundCandidate.province = req.query.province !== undefined ? req.query.province : foundCandidate.province;
            foundCandidate.country = req.query.country !== undefined ? req.query.country : foundCandidate.country;
            foundCandidate.postalCode = req.query.postalCode !== undefined ? req.query.postalCode : foundCandidate.postalCode;
            foundCandidate.birthday = req.query.birthday !== undefined ? req.query.birthday : foundCandidate.birthday;
            foundCandidate.education = req.query.education !== undefined ? req.query.education : foundCandidate.education;
            foundCandidate.experiences = req.query.experiences !== undefined ? req.query.experiences : foundCandidate.experiences;
            foundCandidate.courses = req.query.courses !== undefined ? req.query.courses : foundCandidate.courses;
            foundCandidate.hobbies = req.query.hobbies !== undefined ? req.query.hobbies : foundCandidate.hobbies;
            foundCandidate.mainSkills = req.query.mainSkills !== undefined ? req.query.mainSkills : foundCandidate.mainSkills;
            foundCandidate.profileTypes = req.query.profileTypes !== undefined ? req.query.profileTypes : foundCandidate.profileTypes;
            foundCandidate.isOpenToWork = req.query.isOpenToWork !== undefined ? req.query.isOpenToWork : foundCandidate.isOpenToWork;
    }
    //FALTA PERSISTIR LOS DATOS
};

const remove = (req, res) => {
    const foundCandidate = candidates.list.some(candidate => candidate.id === parseInt(req.params.id));
    if(!foundCandidate){
        res.status(400).json({
            ok:false,
            msg:'Candidate not found by ID'
        });
    }
    else{
        foundCandidate.isActive = false;
    }
    //FALTA PERSISTIR LOS DATOS
};

module.exports = {
  getAll: getAll,
  getById: getById,
  getByName: getByName,
  add: add,
  edit: edit,
  remove: remove
};