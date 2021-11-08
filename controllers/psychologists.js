let psyList = require('../data/psychologists');
const fs = require('fs');
const path = require('path');

const calculateLarger = (collection) => {
  let larger = 0;
  collection.forEach((element) => {
    if (element.id > larger) {
      larger = element.id;
    }
  });
  return larger;
};

const getAll = (req, res) => {
  res.json(psyList);
};

const getById = (req, res) => {
  const found = psyList.find((psychologist) => psychologist.id === parseInt(req.params.id));
  if (found) res.send(found);
  //query params are ALWAYS strings
  else res.status(404).send('User does not exist');
};

const getByName = (req, res) => {
  const found = psyList.some(
    (psychologist) => psychologist.first_name === req.query.first_name && psychologist.last_name === req.query.last_name
  );
  if (found)
    res.send(
      psyList.filter(
        (psychologist) =>
          psychologist.first_name === req.query.first_name && psychologist.last_name === req.query.last_name
      )
    );
  else res.status(404).send([]);
};

const add = (req, res) => {
  const newPsychologist = {};
  newPsychologist.id = calculateLarger(psyList) + 1;
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
  const foundPsy = psyList.find((psychologist) => psychologist.id === parseInt(req.params.id));
  if (foundPsy) {
    psyList = psyList.map((psy) => {
      if (psy.id === parseInt(req.params.id)) {
        if (req.body.first_name) psy.first_name = req.body.first_name;
        if (req.body.last_name) psy.last_name = req.body.last_name;
        if (req.body.email) psy.email = req.body.email;
        if (req.body.pictureUrl) psy.pictureUrl = req.body.pictureUrl;
        if (req.body.password) psy.password = req.body.password;
        if (req.body.isActive) psy.isActive = req.body.isActive;
        if (req.body.turns) psy.turns = req.body.turns;
        return psy;
      }
      return psy;
    });
    fs.writeFile(path.join(__dirname, '../data/psychologists.json'), JSON.stringify(psyList), (err) => {
      if (err) throw err;
    });
    res.status(200).send(foundPsy);
  } else res.status(404).send('The request could not be processed');
};

const remove = (req, res) => {
  let foundPsyIndex = psyList.findIndex((psy) => psy.id === parseInt(req.params.id));
  if (foundPsyIndex !== -1) {
    psyList.splice(foundPsyIndex, 1);
    fs.writeFile(path.join(__dirname, '../data/psychologists.json'), JSON.stringify(psyList), (err) => {
      if (err) throw err;
    });
    return res.status(200).send(`Element with ID = ${req.params.id} deleted`);
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
