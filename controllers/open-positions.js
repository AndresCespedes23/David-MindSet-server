const OpenPosition = require('../models/Open-position');

const getAll = (req, res) => {
  OpenPosition.find()
    .then((data) => res.status(200).json({ data }))
    .catch((err) => res.status(400).json({ msg: `Error: ${err}` }));
};

const getById = (req, res) => {
  const { id } = req.params;
  OpenPosition.findById(id)
    .then((data) => {
      if (!data) {
        return res.status(404).json({ msg: `Open Position not found by ID: ${id}` });
      }
      return res.status(200).json({ data });
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
      return res.status(200).json({ data });
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
  newOpenPosition.save((err, data) => {
    if (err) {
      return res.status(400).json({ msg: `Error: ${err}` });
    }
    return res.status(200).json({ msg: 'Open position added', data });
  });
};

const edit = (req, res) => {
  const { id } = req.params;
  OpenPosition.findByIdAndUpdate(id, req.body, { new: true }, (err, data) => {
    if (err) {
      return res.status(400).json({ msg: `Error: ${err}` });
    }
    if (!data) {
      return res.status(404).json({ msg: `Open Position not found by ID: ${id}` });
    }
    return res.status(200).json({ msg: 'Open position updated', data });
  });
};

const remove = () => {
  console.log('remove');
};

module.exports = {
  getAll,
  getById,
  getByIdCompany,
  add,
  edit,
  remove,
};
