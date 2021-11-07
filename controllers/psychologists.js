const psyList = require('../data/psychologists');
const fs = require('fs');
const path = require('path');

const getAll = (req, res) => {
  res.json(psyList);
};

const getById = (req, res) => {};

const getByName = (req, res) => {};

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
