const Sessions = require('../models/Sessions');

const notFoundTxt = 'Session not found with ID:';

const getAll = (req, res) => {
  Sessions.find().populate('idCandidate', 'firstName lastName').populate('idPsychologists', 'firstName lastName')
    .then((data) => res.json({ data }))
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const getById = (req, res) => {
  const { id } = req.params;
  Sessions.findById(id).populate('idCandidate', 'firstName lastName').populate('idPsychologists', 'firstName lastName')
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `${notFoundTxt} ${id}` });
      return res.json({ data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const search = (req, res) => {
  const queryParam = req.query;
  const idCandidate = queryParam.idCandidate || null;
  if (!idCandidate) return res.status(400).json({ msg: 'Missing query param: candidate' });
  return Sessions.find({ idCandidate })
    .then((data) => {
      if (data.length === 0) return res.status(404).json({ msg: `${notFoundTxt} session ID: ${idCandidate}` });
      return res.json({ data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const add = (req, res) => {
  const newSession = new Sessions({
    idPsychologists: req.body.idPsychologists,
    idCandidate: req.body.idCandidate,
    date: req.body.date,
    isActive: true,
  });
  newSession
    .save()
    .then((data) => res.json({ msg: 'Session added', data }))
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const edit = (req, res) => {
  const { id } = req.params;
  Sessions.findByIdAndUpdate(id, req.body, { new: true })
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `${notFoundTxt} ${id}` });
      return res.json({ msg: 'Session updated', data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const remove = (req, res) => {
  const { id } = req.params;
  Sessions.findByIdAndDelete(id)
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `${notFoundTxt} ${id}` });
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
  remove,
};
