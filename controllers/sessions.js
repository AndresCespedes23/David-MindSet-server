const sessions = require('../models/sessions');

const getAll = (req, res) => {
  sessions.find()
    .then((data) => res.json({ data }))
    .catch((err) => res.status(400).json({ msg: `Error: ${err}` }));
};

const getById = (req, res) => {
  const { id } = req.params;
  sessions.findById(id)
    .then((data) => {
      if (!data) {
        return res.status(404).json({ msg: `session not found by ID: ${id}` });
      }
      return res.json({ data });
    })
    .catch((err) => res.status(400).json({ msg: `Error: ${err}` }));
};

const getByIdPsycologist = (req, res) => {
  const { idPsychologists } = req.params;
  sessions.findById(idPsychologists)
    .then((data) => {
      if (!data) {
        return res.status(404).json({ msg: `session not found with psychologist ID: ${id}` });
      }
      return res.json({ data });
    })
    .catch((err) => res.status(400).json({ msg: `Error: ${err}` }));
};

const getByIdCandidate = (req, res) => {
  const { idPsychologists } = req.params;
  sessions.findById(idPsychologists)
    .then((data) => {
      if (!data) {
        return res.status(404).json({ msg: `session not found with candidate ID: ${id}` });
      }
      return res.json({ data });
    })
    .catch((err) => res.status(400).json({ msg: `Error: ${err}` }));
};



const add = (req, res) => {
  const newSession = new sessions({
    idPsychologists: req.params.idPsychologists,
    idCandidate: req.params.idCandidate,
    date: req.params.date,
    isActive: true
  });
  newSession
    .save()
    .then((data) => res.json({ msg: 'Session added', data }))
    .catch((err) => res.status(400).json({ msg: `Error: ${err}` }));
};

const edit = (req, res) => {
  const { id } = req.params;
  sessions.findByIdAndUpdate(id, req.body, { new: true })
  .then((data) => {
    if (!data) {
      return res.status(404).json({ msg: `Session not found by ID: ${id}` });
    }
    return res.json({ msg: 'Session updated', data });
  })
  .catch((err) => res.status(400).json({ msg: `Error: ${err}` }));
};

const remove = (req, res) => {
  const { id } =  req.params;
  sessions.findByIdAndDelete(id)
  .then((data) => {
    if (!data) {
      return res.status(404).json({ msg: `Session not found by ID: ${id}` });
    }
    return res.json({ msg: 'Session removed', data });
  })
  .catch((err) => res.status(400).json({ msg: `Error: ${err}` }));
};

module.exports = {
  getAll,
  getByIdPsycologist,
  getByIdCandidate,
  add,
  getById,
  edit,
  remove
};