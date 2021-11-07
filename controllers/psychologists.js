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
  newPsychologist.id = 0;
  psyList.forEach((psy) => {
    if (psy.id >= newPsychologist.id) newPsychologist.id = psy.id + 1;
  });
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

const edit = (req, res) => {};

const remove = (req, res) => {};

const removeWithAnyParam = (req, res) => {};

module.exports = {
  getAll: getAll,
  getById: getById,
  getByName: getByName,
  add: add,
  edit: edit,
  remove: remove,
  removeWithAnyParam: removeWithAnyParam,
};
