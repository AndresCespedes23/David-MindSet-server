const psyList = require('../data/psychologists');
const fs = require('fs');
const path = require('path');

const getAll = (req, res) => {
  res.json(psyList);
};

const getById = (req, res) => {
  const found = psyList.some((psychologist) => psychologist.id === parseInt(req.params.id));
  if (found) res.send(psyList.filter((psychologist) => psychologist.id === parseInt(req.params.id)));
  //query params are ALWAYS strings
  else res.status(404).send('User does not exist');
};

const getByName = (req, res) => {
  const found = psyList.some((psychologist) => psychologist.first_name === req.params.name);
  if (found) res.send(psyList.filter((psychologist) => psychologist.first_name === req.params.name));
  else res.status(404).send([]);
};

const add = (req, res) => {
  const newPsychologist = {};
  newPsychologist.id = psyList[psyList.length - 1].id + 1;
  if (req.body.first_name) newPsychologist.first_name = req.body.first_name;
  else newPsychologist.first_name = null;
  if (req.body.last_name) newPsychologist.last_name = req.body.last_name;
  else newPsychologist.last_name = null;
  if (req.body.email) newPsychologist.email = req.body.email;
  else newPsychologist.email_name = null;
  if (req.body.pictureUrl) newPsychologist.pictureUrl = req.body.pictureUrl;
  else newPsychologist.pictureUrl = null;
  if (req.body.password) newPsychologist.password = req.body.password;
  else newPsychologist.password = null;
  if (req.body.isActive) newPsychologist.isActive = req.body.isActive;
  else newPsychologist.isActive = true;
  if (req.body.turns) newPsychologist.turns = req.body.turns;
  else newPsychologist.turns = [];

  psyList.push(newPsychologist);
  fs.writeFile(path.join(__dirname, '../data/psychologists.json'), JSON.stringify(psyList), (err) => {
    if (err) throw err;
  });
  res.status(200).send(newPsychologist);
};

const edit = (req, res) => {
  let updatedPsy;
  const found = psyList.some((psychologist) => psychologist.id === parseInt(req.params.id));
  if (found) {
    psyList.map((psychologist) => {
      if (psychologist.id === parseInt(req.params.id)) {
        if (req.body.first_name) psychologist.first_name = req.body.first_name;
        if (req.body.last_name) psychologist.last_name = req.body.last_name;
        if (req.body.email) psychologist.email = req.body.email;
        if (req.body.pictureUrl) psychologist.pictureUrl = req.body.pictureUrl;
        if (req.body.password) psychologist.password = req.body.password;
        if (req.body.isActive) psychologist.isActive = req.body.isActive;
        if (req.body.turns) psychologist.turns = req.body.turns;
        updatedPsy = psychologist;
      }
    });
    fs.writeFile(path.join(__dirname, '../data/psychologists.json'), JSON.stringify(psyList), (err) => {
      if (err) throw err;
    });
    res.status(200).send(updatedPsy);
  } else res.status(404).send('The request could not be processed');
};

const remove = (req, res) => {
  let foundPsy = psyList.filter((psy) => psy.id === parseInt(req.params.id));
  if (foundPsy[0] !== undefined) {
    psyList.splice(
      psyList.findIndex((psy) => psy.id === parseInt(req.params.id)),
      1
    );
    fs.writeFile(path.join(__dirname, '../data/psychologists.json'), JSON.stringify(psyList), (err) => {
      if (err) throw err;
    });
    return res.status(200).send(`Element with ID = ${foundPsy.id} deleted`);
  } else {
    return res.status(404).send('Element with provided ID not found');
  }
};

const removeWithAnyParam = (req, res) => {
  //removes using any property
  //by inputting through the body, the content type is always matched
  let foundPsys = [];
  let psyIndex = 0;
  let psyMatchedIndex;
  psyList.forEach((psyListElement) => {
    let matchedPropertiesAmount = 0;
    psyIndex++;
    for (let property in req.body) {
      if (req.body.hasOwnProperty(property)) {
        if (req.body[property] !== psyListElement[property]) break;
        matchedPropertiesAmount++;
      }
    }
    if (matchedPropertiesAmount === Object.keys(req.body).length) {
      foundPsys.push(psyListElement);
      psyMatchedIndex = psyIndex - 1;
    }
  });
  if (foundPsys.length > 1) {
    return res.status(200).send(foundPsys);
  } else if (foundPsys.length === 1) {
    psyList.splice(psyMatchedIndex, 1);
    fs.writeFile(path.join(__dirname, '../data/psychologists.json'), JSON.stringify(psyList), (err) => {
      if (err) throw err;
    });
    return res.status(200).send(foundPsys);
  } else {
    return res.status(404).send(foundPsys);
  }
};

module.exports = {
  getAll: getAll,
  getById: getById,
  getByName: getByName,
  add: add,
  edit: edit,
  remove: remove,
  removeWithAnyParam: removeWithAnyParam,
};
