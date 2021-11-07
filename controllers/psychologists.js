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

const add = (req, res) => {};

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
