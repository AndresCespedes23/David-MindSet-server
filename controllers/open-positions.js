const OpenPosition = require('../models/OpenPosition');

const notFoundTxt = 'Open Position not found by';

const getAll = (req, res) => {
  OpenPosition.find().populate('idCompany', 'name')
    .then((data) => res.json({ data }))
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const getById = (req, res) => {
  const { id } = req.params;
  OpenPosition.findById(id)
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
  return OpenPosition.find({ idCompany })
    .then((data) => {
      if (data.length === 0) return res.status(404).json({ msg: `${notFoundTxt} Company ID: ${idCompany}` });
      return res.json({ data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const add = (req, res) => {
  const newOpenPosition = new OpenPosition({
    idCompany: req.body.idCompany,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    jobDescription: req.body.jobDescription,
  });
  newOpenPosition
    .save()
    .then((data) => res.json({ msg: 'Open position added', data }))
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const edit = (req, res) => {
  const { id } = req.params;
  OpenPosition.findByIdAndUpdate(id, req.body, { new: true })
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `${notFoundTxt} ID: ${id}` });
      return res.json({ msg: 'Open position updated', data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const remove = (req, res) => {
  const { id } = req.params;
  OpenPosition.findByIdAndRemove(id)
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `${notFoundTxt} ID: ${id}` });
      return res.json({ msg: 'Open position removed', data });
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
