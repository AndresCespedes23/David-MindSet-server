const Interviews = require('../models/Interviews');

const notFoundTxt = 'Interview not found by';

const getAll = (req, res) => {
  Interviews.find().populate('idCompany', 'name').populate('idCandidate', 'firstName lastName')
    .then((data) => res.json({ data }))
    .catch((err) => res.status(400).json({ msg: `Error: ${err}` }));
};

const getById = (req, res) => {
  const { id } = req.params;
  Interviews.findById(id).populate('idCompany', 'name').populate('idCandidate', 'firstName lastName')
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `${notFoundTxt} ID: ${id}` });
      return res.json({ data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const search = (req, res) => {
  const queryParam = req.query;
  const idCompany = queryParam.company || null;
  if (!idCompany) return res.status(400).json({ msg: 'Missing query param: company' });
  return Interviews.find({ idCompany }).populate('idCompany', 'name').populate('idCandidate', 'firstName lastName')
    .then((data) => {
      if (data.length === 0) return res.status(404).json({ msg: `${notFoundTxt} Company ID: ${idCompany}` });
      return res.json({ data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const add = (req, res) => {
  const newInterview = new Interviews({
    idCompany: req.body.idCompany,
    idCandidate: req.body.idCandidate,
    date: req.body.date,
    status: req.body.status,
    isActive: true,
  });
  newInterview
    .save()
    .then((data) => res.json({ msg: 'New interview added', data }))
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const edit = (req, res) => {
  const { id } = req.params;
  Interviews.findByIdAndUpdate(id, req.body, { new: true }).populate('idCompany', 'name').populate('idCandidate', 'firstName lastName')
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `${notFoundTxt} ID: ${id}` });
      return res.json({ msg: 'Interview updated', data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const remove = (req, res) => {
  const { id } = req.params;
  Interviews.findByIdAndRemove(id).populate('idCompany', 'name').populate('idCandidate', 'firstName lastName')
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `${notFoundTxt} ID: ${id}` });
      return res.json({ msg: 'Interview removed', data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

module.exports = {
  getAll,
  getById,
  search,
  add,
  edit,
  remove,
};
