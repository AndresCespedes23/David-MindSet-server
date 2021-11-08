let psyList = require('../data/psychologists');
const fs = require('fs');
const path = require('path');

const getLastId = (collection) => {
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
  if (!found) return res.status(404).send('User does not exist');
  res.json(found);
  //query params are ALWAYS strings
};

const getByName = (req, res) => {
  const foundPsy = psyList.find(
    (psychologist) => psychologist.firstName === req.query.firstName && psychologist.lastName === req.query.lastName
  );
  if (!foundPsy) return res.status(404).send([]);
  res.json(foundPsy);
};

const add = (req, res) => {
  const newPsychologist = {};
  newPsychologist.id = getLastId(psyList) + 1;
  newPsychologist.firstName = req.body.firstName || null;
  newPsychologist.lastName = req.body.lastName || null;
  newPsychologist.email = req.body.email || null;
  newPsychologist.pictureUrl = req.body.pictureUrl || null;
  newPsychologist.password = req.body.password || null;
  newPsychologist.isActive = req.body.isActive || true;
  newPsychologist.turns = req.body.turns || [];
  psyList.push(newPsychologist);
  fs.writeFile(path.join(__dirname, '../data/psychologists.json'), JSON.stringify(psyList), (err) => {
    if (err) throw err;
  });
  res.json(newPsychologist);
};

const edit = (req, res) => {
  const foundPsy = psyList.find((psychologist) => psychologist.id === parseInt(req.params.id));
  if (!foundPsy) return res.status(404).send('The request could not be processed');
  psyList = psyList.map((psy) => {
    if (psy.id === parseInt(req.params.id)) {
      if (req.body.firstName) psy.firstName = req.body.firstName;
      if (req.body.lastName) psy.lastName = req.body.lastName;
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
  res.json(foundPsy);
};

const remove = (req, res) => {
  let foundPsyIndex;
  psyList = psyList.filter((psy) => {
    if (psy.id !== parseInt(req.params.id)) return true;
    foundPsyIndex = psyList.indexOf(psy);
    return false;
  });
  if (foundPsyIndex === undefined) return res.status(404).send('Element with provided ID not found');
  fs.writeFile(path.join(__dirname, '../data/psychologists.json'), JSON.stringify(psyList), (err) => {
    if (err) throw err;
  });
  return res.json(`Element with ID = ${req.params.id} deleted`);
};

/* const removeWithAnyParam = (req, res) => {
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
    return res.json(foundPsys);
  } else if (foundPsys.length === 1) {
    psyList.splice(psyMatchedIndex, 1);
    fs.writeFile('./data/psychologists.json', JSON.stringify(psyList), (err) => {
      if (err) throw err;
    });
    return res.json(foundPsys);
  } else {
    return res.status(404).json(foundPsys);
  }
};
 */
module.exports = {
  getAll: getAll,
  getById: getById,
  getByName: getByName,
  add: add,
  edit: edit,
  remove: remove,
  /*   removeWithAnyParam: removeWithAnyParam,
   */
};
