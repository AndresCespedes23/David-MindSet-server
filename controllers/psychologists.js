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

const validate = (object) => {
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      if (object[key] === undefined) {
        return false;
      }
    }
  }
  return true;
};

const getAll = (req, res) => {
  res.json(psyList);
};

const getById = (req, res) => {
  const foundPsy = psyList.find((psychologist) => psychologist.id === parseInt(req.params.id));
  if (!foundPsy) return res.status(404).send({ message: `Psychologist not found with id: ${req.params.id}` });
  res.json(foundPsy);
  //query params are ALWAYS strings
};

const getByName = (req, res) => {
  const foundPsy = psyList.find(
    (psychologist) => psychologist.firstName === req.query.firstName && psychologist.lastName === req.query.lastName
  );
  if (!foundPsy)
    return res
      .status(404)
      .send({ message: `Psychologist not found with name: ${req.query.firstName} ${req.query.lastName}` });
  res.json(foundPsy);
};

const add = (req, res) => {
  const newPsychologist = {};
  newPsychologist.id = getLastId(psyList) + 1;
  newPsychologist.firstName = req.body.firstName || undefined;
  newPsychologist.lastName = req.body.lastName || undefined;
  newPsychologist.email = req.body.email || undefined;
  newPsychologist.pictureUrl = req.body.pictureUrl || undefined;
  newPsychologist.password = req.body.password || undefined;
  newPsychologist.isActive = req.body.isActive || true;
  newPsychologist.turns = req.body.turns || [];
  if (!validate(newPsychologist)) return res.status(400).json({ message: 'Missing parameters' });
  psyList.push(newPsychologist);
  fs.writeFile(path.join(__dirname, '../data/psychologists.json'), JSON.stringify(psyList), (err) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: 'Error adding psychologist' });
      return;
    }
  });
  res.json(newPsychologist);
};

const edit = (req, res) => {
  const foundPsy = psyList.find((psychologist) => psychologist.id === parseInt(req.params.id));
  if (!foundPsy) return res.status(404).send({ message: 'Error editing psychologist' });
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
    if (err) {
      console.log(err);
      res.status(500).json({ message: 'Error editing psychologist' });
      return;
    }
  });
  res.json({ message: 'Psychologist edited successfully', companyFound });
};

const remove = (req, res) => {
  let foundPsyIndex;
  psyList = psyList.filter((psy) => {
    if (psy.id !== parseInt(req.params.id)) return true;
    foundPsyIndex = psyList.indexOf(psy);
    return false;
  });
  if (foundPsyIndex === undefined)
    return res.status(404).send({ message: `Psychologist not found with id ${req.params.id}` });
  fs.writeFile(path.join(__dirname, '../data/psychologists.json'), JSON.stringify(psyList), (err) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: 'Error deleting psychologist' });
      return;
    }
  });
  return res.json(`Element with ID = ${req.params.id} deleted`);
};

module.exports = {
  getAll: getAll,
  getById: getById,
  getByName: getByName,
  add: add,
  edit: edit,
  remove: remove,
};
