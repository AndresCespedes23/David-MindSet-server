const sessions = require('../models/Sessions');

const notFoundTxt = 'Session not found with ID:';

const getAll = (req, res) => {
  sessions.find()
    .then((data) => res.json({ data }))
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const getById = (req, res) => {
  const { id } = req.params;
  sessions.findById(id)
    .then((data) => {
      if (!data) {
        return res.status(404).json({ msg: `${notFoundTxt} ${id}` });
      }
      return res.json({ data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const search = (req, res) => {
  const queryParam = req.query;
  const idCandidate = queryParam.idCandidate || null;
  if (!idCandidate) return res.status(400).json({ msg: 'Missing query param: candidate' });
  return sessions.find({ idCandidate })
    .then((data) => {
      if (data.length === 0) return res.status(404).json({ msg: `${notFoundTxt} session ID: ${idCandidate}` });
      return res.json({ data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
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
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const edit = (req, res) => {
  const { id } = req.params;
  sessions.findByIdAndUpdate(id, req.body, { new: true })
    .then((data) => {
      if (!data) {
        return res.status(404).json({ msg: `${notFoundTxt} ${id}` });
      }
      return res.json({ msg: 'Session updated', data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const remove = (req, res) => {
  const { id } = req.params;
  sessions.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        return res.status(404).json({ msg: `${notFoundTxt} ${id}` });
      }
      return res.json({ msg: 'Session removed', data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

module.exports = {
  getAll,
  search,
  add,
  getById,
  edit,
  remove
};
