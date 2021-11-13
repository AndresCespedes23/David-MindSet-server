const OpenPosition = require('../models/Open-position');

const getAll = (req, res) => {
  OpenPosition.find()
    .then((data) => res.json({ data }))
    .catch((err) => res.status(400).json({ msg: `Error: ${err}` }));
};

const getById = (req, res) => {
  const { id } = req.params;
  OpenPosition.findById(id)
    .then((data) => {
      if (!data) {
        return res.status(404).json({ msg: `Open Position not found by ID: ${id}` });
      }
      return res.json({ data });
    })
    .catch((err) => res.status(400).json({ msg: `Error: ${err}` }));
};

const getByIdCompany = (req, res) => {
  const { id } = req.params;
  OpenPosition.find({ idCompany: id })
    .then((data) => {
      if (data.length === 0) {
        return res.status(404).json({ msg: `Open Position not found by Company ID: ${id}` });
      }
      return res.json({ data });
    })
    .catch((err) => res.status(400).json({ msg: `Error: ${err}` }));
};

const add = (req, res) => {
  const newOpenPosition = new OpenPosition({
    idCompany: req.body.idCompany,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    jobDescription: req.body.jobDescription,
    isActive: true,
  });
  newOpenPosition
    .save()
    .then((data) => res.json({ msg: 'Open position added', data }))
    .catch((err) => res.status(400).json({ msg: `Error: ${err}` }));
};

const edit = (req, res) => {
  const { id } = req.params;
  OpenPosition.findByIdAndUpdate(id, req.body, { new: true })
    .then((data) => {
      if (!data) {
        return res.status(404).json({ msg: `Open Position not found by ID: ${id}` });
      }
      return res.json({ msg: 'Open position updated', data });
    })
    .catch((err) => res.status(400).json({ msg: `Error: ${err}` }));
};

const remove = (req, res) => {
  const { id } = req.params;
  OpenPosition.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        return res.status(404).json({ msg: `Open Position not found by ID: ${id}` });
      }
      return res.json({ msg: 'Open position removed', data });
    })
    .catch((err) => res.status(400).json({ msg: `Error: ${err}` }));
};

module.exports = {
  getAll,
  getById,
  getByIdCompany,
  add,
  edit,
  remove,
};
