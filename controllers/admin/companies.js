/* easdslint-disable consistent-return */
const Companies = require('../../models/Companies');

const idNotFoundString = 'Company not found with ID:';

const getAll = (req, res) => {
  Companies.find()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
};

const getById = (req, res) => {
  Companies.findById(req.params.id)
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `${idNotFoundString} ${req.params.id}`, error: true });
      return res.status(200).json(data);
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
};

const search = (req, res) => {
  Companies.find(req.query)
    .then((data) => {
      if (data.length === 0) {
        return res.status(404).json({ msg: `Company not found with parameters: ${req.query}`, error: true });
      }
      return res.status(200).json(data);
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
};

const add = (req, res) => {
  new Companies(req.body)
    .save()
    .then((data) => res.status(201).json({ msg: 'Company created', data }))
    .catch((err) => {
      res.status(500).json({ msg: `Error: ${err}`, error: true });
    });
};

const edit = (req, res) => {
  Companies.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `${idNotFoundString} ${req.params.id}`, error: true });
      return res.status(200).json({ msg: 'Company updated', data });
    })
    .catch((err) => {
      res.status(500).json({ msg: `Error: ${err}`, error: true });
    });
};

const remove = (req, res) => {
  Companies.findByIdAndRemove(req.params.id)
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `${idNotFoundString} ${req.params.id}`, error: true });
      return res.status(200).json({ msg: 'Company deleted', data });
    })
    .catch((err) => {
      res.status(500).json({ msg: `Error: ${err}`, error: true });
    });
};

module.exports = {
  getAll,
  getById,
  search,
  add,
  edit,
  remove,
};
