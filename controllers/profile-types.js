const { profile } = require('console');
const fs = require('fs');
let profileTypes = require('../data/profile-types.json');

const getAll = (req, res) => {
    // your code here
    res.json(profileTypes);
};

const getById = (req, res) => {
    // your code here
    const profileTypesId  = profileTypes.find((profileTypesId) => profileTypesId.id === parseInt(req.params.id));
    if (profileTypesId) {
      res.json(profileTypesId);
    } else {
      res.status(404).json({ message: `Profile not found with id: ${parseInt(req.params.id)}` });
    }
};

const getByName = (req, res) => {
    // your code here
    const profileTypesName  = profileTypes.find((profileTypesName) => profileTypesName.name === (req.params.name));
    if (profileTypesName) {
      res.json(profileTypesName);
    } else {
      res.status(404).json({ message: `Profile not found with name: ${(req.params.name)}` });
    }
    
};

const add = (req, res) => {
    // your code here
   const newProfile = {
    id: profileTypes.length + 1,
    name: req.query.name,
    isActive: req.query.isActive

  }
 if(profileTypes.id !== null && profileTypes.name !== null && profileTypes.isActive !== null ){
  profileTypes.push(newProfile)}

  fs.writeFile('./data/profile-types.json', JSON.stringify(profileTypes), error =>{
    if(error){res.status(500)}
  })

  res.json(newProfile)
};

const edit = (req, res) => {
    // your code here
    
    const searchProfile = profileTypes.find((profile)=> profile.id === parseInt(req.params.id));
  if (searchProfile){
    profileTypes.map((profile) => {

      if(profile.id === parseInt(req.params.id)){
        if(req.query.name) profile.name = req.query.name;
        if(req.query.isActive) profile.isActive = req.query.isActive;
        return profile;
      }
      return profile;
    }
    )}
    res.json(searchProfile);
    fs.writeFile('./data/profile-types.json', JSON.stringify(profileTypes), error =>{
      if(error){res.status(500)}
    })
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