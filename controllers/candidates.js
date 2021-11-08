const fs = require('fs');
let candidates = require('../data/candidates.json');

const getLastId = (collection) => {
    let larger = 0;
    collection.forEach((element) => {
      if (element.id > larger) {
        larger = element.id;
      }
    });
    return larger;
};
const validateField = (field, key, errorArray) => {
    if (field === undefined){
        errorArray.push(`${key} is required`)
    }
    return errorArray;
}
const getAll = (req, res) => {
    res.json( candidates.list);
};

const getById = (req, res) => {
    const candidateID = parseInt(req.params.id);
    const foundCandidate = candidates.list.find(candidate => candidate.id === candidateID);
    if(!foundCandidate){
        res.status(404).json({
            message:'Candidate not found by ID'
        });
    }
    else{
        res.json(foundCandidate)
    }
};

const getByName = (req, res) => {
    const foundCandidates = candidates.list.filter(candidate => candidate.firstName.toLowerCase() === req.params.name.toLowerCase())
    if(foundCandidates.length === 0){
        res.status(404).json({
            message:'Candidate not found by FirstName',
            candidates: foundCandidates
        });
    }
    else{
        res.json(foundCandidates)
    }
};

const add = (req, res) => {
    let errorMsg = [];
    errorMsg = validateField(req.query.firstName,'firstName',errorMsg);
    errorMsg = validateField(req.query.lastName,'lastName',errorMsg);
    errorMsg = validateField(req.query.email,'email',errorMsg);
    errorMsg = validateField(req.query.password,'password',errorMsg);
    errorMsg = validateField(req.query.phone,'phone',errorMsg);
    errorMsg = validateField(req.query.address,'address',errorMsg);
    errorMsg = validateField(req.query.city,'city',errorMsg);
    errorMsg = validateField(req.query.province,'province',errorMsg);
    errorMsg = validateField(req.query.country,'country',errorMsg);
    errorMsg = validateField(req.query.postalCode,'postalCode',errorMsg);
    errorMsg = validateField(req.query.birthday,'birthday',errorMsg);
    if(errorMsg.length !== 0){
        res.status(400).json({
            message: errorMsg
        })
    }
    else{
        let lastID = getLastId(candidates);
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
        fs.writeFile(path.join(__dirname, '../data/candidates.json'), JSON.stringify(candidates),err =>{
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
    const updatedCandidate = {};
    if(!foundCandidate){
        res.status(404).json({
            message:'Candidate not found by ID'
        });
    }
    else{
        candidates = candidates.list.map((candidate) => {
            if(candidate.id === candidateID){
                candidate.firstName =  req.query.firstName || candidate.firstName;
                candidate.lastName =  req.query.lastName || candidate.lastName;
                candidate.email =  req.query.email || candidate.email;
                candidate.password =  req.query.password || candidate.password;
                candidate.pictureUrl =  req.query.pictureUrl || candidate.pictureUrl;
                candidate.phone =  req.query.phone || candidate.phone;
                candidate.address =  req.query.address || candidate.address;
                candidate.city =  req.query.city || candidate.city;
                candidate.province =  req.query.province || candidate.province;
                candidate.country =  req.query.country || candidate.country;
                candidate.postalCode =  req.query.postalCode || candidate.postalCode;
                candidate.birthday =  req.query.birthday || candidate.birthday;
                candidate.education = req.query.education !== undefined ? [req.query.education] : candidate.education;
                candidate.experiences = req.query.experiences !== undefined ? [req.query.experiences] : candidate.experiences;
                candidate.courses = req.query.courses !== undefined ? [req.query.courses] : candidate.courses;
                candidate.hobbies = req.query.hobbies !== undefined ? [req.query.hobbies] : candidate.hobbies;
                candidate.mainSkills = req.query.mainSkills !== undefined ? [req.query.mainSkills] : candidate.mainSkills;
                candidate.profileTypes = req.query.profileTypes !== undefined ? [req.query.profileTypes] : candidate.profileTypes;
                candidate.isOpenToWork = req.query.isOpenToWork || candidate.isOpenToWork;
                updatedCandidate = candidate;
            }
            return candidate;
        })
        fs.writeFile(path.join(__dirname, '../data/candidates.json'), JSON.stringify({list:candidates}),err =>{
            if(err){
                res.status(500).json({
                    message:'Error while saving data'
                })
            }
            else{
                res.json({
                    message: 'Updated Candidate',
                    candidate: updatedCandidate
                })
            }
        })
    }
};

const remove = (req, res) => {
    const candidateID = parseInt(req.params.id);
    const foundCandidate = candidates.list.filter(candidate => candidate.id === candidateID);
    if(!foundCandidate){
        res.status(404).json({
            message:'Candidate not found by ID'
        });
    }
    else{
        candidates = candidates.list.filter((candidate) => candidate.id !== candidateID);
        fs.writeFile(path.join(__dirname, '../data/candidates.json'), JSON.stringify({list:candidates}),err =>{
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