const fs = require('fs');
const path = require('path');
let profileTypes = require('../data/profile-types.json');

const getLastID = (collection) => {
  let larger = 0;
  collection.forEach((element) => {
    if (element.id > larger) {
    larger = element.id;
    }
  });
  return larger;
};

const getAll = (req, res) => {
    // your code here
  res.json(profileTypes);
};

const getById = (req, res) => {
    // your code here
    const profileTypesId  = profileTypes.find((profileTypesId) => profileTypesId.id === parseInt(req.params.id));
    if (!profileTypesId) {
      res.status(404).json({ message: `Profile not found with id: ${parseInt(req.params.id)}` });
    }
    res.json(profileTypesId);
};

const getByName = (req, res) => {
    // your code here
  const profileTypesName  = profileTypes.filter((profileTypesName) => profileTypesName.name === (req.params.name));
  if (!profileTypesName) {
    res.status(404).json({ message: `Profile not found with name: ${(req.params.name)}` });      
  }
  res.json(profileTypesName); 
};

const add = (req, res) => {
    // your code here
  const newProfile = { 
    id: getLastID(profileTypes) + 1 ,
    name: req.query.name,
    isActive: req.query.isActive
  }
    if(profileTypes.id !== null && profileTypes.name !== null && profileTypes.isActive !== null ){
      profileTypes.push(newProfile)}
      fs.writeFile(path.join(__dirname, './data/profile-types.json'), JSON.stringify(profileTypes), err =>{
      if(err){
        res.status(500).json({ message: 'Error adding profile' })};
      })
  res.json(newProfile);
};

const edit = (req, res) => {
    // your code here    
  const searchProfile = profileTypes.find((profile)=> profile.id === parseInt(req.params.id));
  if (searchProfile){
    profileTypes.map((profile) => {
      if(profile.id === parseInt(req.params.id)){
        if(req.query.name) profile.name = req.query.name;
        if(req.query.isActive) profile.isActive = req.query.isActive;
      }
      return profile;
    }
  )}
  res.json(searchProfile);
  fs.writeFile(path.join(__dirname, './data/profile-types.json'), JSON.stringify(profileTypes), err =>{
    if(err){
      res.status(500).json({ message: 'Error editing profile' });}
  })
};

const remove = (req, res) => {
      // your code here
  const searchProfile = profileTypes.find((profile) => profile.id === parseInt(req.params.id));
  const profileRemove = profileTypes.filter((profile)=> profile.id !== parseInt(req.params.id));
  fs.writeFile(path.join(__dirname, './data/profile-types.json'), JSON.stringify(profileRemove), err =>{
    if(err){
      res.status(500).json({ message: 'Error deleting profile' });}
  })
  if(!searchProfile){
    res.status(400).json({message:`Profile not found with id ${req.params.id}`});
  }
  res.json({message: 'Profile deleted'});
};

module.exports = {
  getAll: getAll,
  getById: getById,
  getByName: getByName,
  add: add,
  edit: edit,
  remove: remove
};