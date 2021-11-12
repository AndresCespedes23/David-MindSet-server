const fs = require('fs');
const path = require('path');
/* let candidates = require('../data/candidates.json'); */

const getLastId = (collection) => {
    let larger = 0;
    collection.forEach((element) => {
      if (element.id > larger) {
        larger = element.id;
      }
    });
    return larger;
};

const validate = (object) => {
    for (let key in object) {
      if (object[key] === undefined) {
        return false;
      }
    }
    return true;
};

const getAll = (req, res) => {
    res.json(candidates.list);
};

const getById = (req, res) => {
    const candidateID = parseInt(req.params.id);
    const foundCandidate = candidates.list.find(candidate => candidate.id === candidateID);
    if (!foundCandidate) {
        return res.status(404).json({ message: `Candidate not found with id: ${candidateID}` });
    }
    res.json(foundCandidate);
};

const getByName = (req, res) => {
    const name = req.params.name;
    const foundCandidates = candidates.list.filter(candidate => candidate.firstName.toLowerCase() === name.toLowerCase())
    if (foundCandidates.length === 0) {
        return res.status(404).json({
            message: `Candidate not found with name: ${name}`,
            candidates: foundCandidates
        });
    }
    res.json(foundCandidates);
};

const add = (req, res) => {
    let lastID = getLastId(candidates.list);
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
    };
    if (!validate(newCandidate)) {
        return res.status(400).json({ message: 'Missing parameters' });
    }
    candidates.list.push(newCandidate);
    fs.writeFile(path.join(__dirname, '../data/candidates.json'), JSON.stringify(candidates), err => {
        if (err) {
            return res.status(500).json({ message:'Error while saving data' });
        }
        res.json({
            message: 'Candidate created',
            candidate: newCandidate
        });
    });
};

const edit = (req, res) => {
    const candidateID = parseInt(req.params.id)
    const foundCandidate = candidates.list.find(candidate => candidate.id === candidateID);
    let updatedCandidate;
    if (!foundCandidate) {
        return res.status(404).json({ message: `Candidate not found with id: ${candidateID}` });
    }
    candidates = candidates.list.map((candidate) => {
        if (candidate.id === candidateID) {
            candidate.firstName = req.query.firstName || candidate.firstName;
            candidate.lastName = req.query.lastName || candidate.lastName;
            candidate.email = req.query.email || candidate.email;
            candidate.password = req.query.password || candidate.password;
            candidate.pictureUrl = req.query.pictureUrl || candidate.pictureUrl;
            candidate.phone = req.query.phone || candidate.phone;
            candidate.address = req.query.address || candidate.address;
            candidate.city = req.query.city || candidate.city;
            candidate.province = req.query.province || candidate.province;
            candidate.country = req.query.country || candidate.country;
            candidate.postalCode = req.query.postalCode || candidate.postalCode;
            candidate.birthday = req.query.birthday || candidate.birthday;
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
    });
    fs.writeFile(path.join(__dirname, '../data/candidates.json'), JSON.stringify({ list: candidates }), err => {
        if (err) {
            return res.status(500).json({ message: 'Error while saving data' });
        }
        res.json({
            message: 'Updated Candidate',
            candidate: updatedCandidate
        });
    });
};

const remove = (req, res) => {
    const candidateID = parseInt(req.params.id);
    const foundCandidate = candidates.list.filter(candidate => candidate.id === candidateID);
    if (!foundCandidate) {
        return res.status(404).json({ message: `Candidate not found with id: ${candidateID}` });
    }
    candidates = candidates.list.filter((candidate) => candidate.id !== candidateID);
    fs.writeFile(path.join(__dirname, '../data/candidates.json'), JSON.stringify({ list: candidates }), err => {
        if (err) {
            return res.status(500).json({ message: 'Error while saving data' });
        }
        res.json({ message: 'Deleted Candidate' });
    });
};

module.exports = {
  getAll: getAll,
  getById: getById,
  getByName: getByName,
  add: add,
  edit: edit,
  remove: remove,
};
