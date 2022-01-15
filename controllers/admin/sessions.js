const Sessions = require('../../models/Sessions');

const notFoundTxt = 'Session not found with ID:';

const getAll = (req, res) => {
  Sessions.find({ $or: [{ status: 'pending' }, { status: 'done' }] })
    .populate('idPsychologist', 'firstName lastName')
    .populate('idCandidate', 'firstName lastName')
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
};

const getById = (req, res) => {
  const { id } = req.params;
  Sessions.findById(id)
    .populate('idPsychologist', 'firstName lastName')
    .populate('idCandidate', 'firstName lastName')
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `${notFoundTxt} ${id}`, error: true });
      return res.status(200).json(data);
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
};

const search = (req, res) => {
  const queryParam = req.query;
  const idCandidate = queryParam.idCandidate || null;
  if (!idCandidate) {
    return res.status(400).json({ msg: 'Missing query param: candidate', error: true });
  }
  return Sessions.find({ idCandidate })
    .then((data) => {
      if (data.length === 0) {
        return res
          .status(404)
          .json({ msg: `${notFoundTxt} session ID: ${idCandidate}`, error: true });
      }
      return res.status(200).json(data);
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
};

const add = (req, res) => {
  const newSession = new Sessions({
    idPsychologist: req.body.idPsychologist,
    idCandidate: req.body.idCandidate,
    date: req.body.date,
    time: req.body.time,
    status: 'pending',
    isActive: true,
  });
  newSession
    .save()
    .then((data) => res.status(201).json({ msg: 'Session created', data }))
    .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
};

const edit = (req, res) => {
  const { id } = req.params;
  Sessions.findByIdAndUpdate(id, req.body, { new: true })
    .populate('idPsychologist', 'firstName lastName')
    .populate('idCandidate', 'firstName lastName')
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `${notFoundTxt} ${id}`, error: true });
      return res.status(200).json({ msg: 'Session updated', data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
};

const remove = (req, res) => {
  const { id } = req.params;
  Sessions.findByIdAndDelete(id)
    .populate('idPsychologist', 'firstName lastName')
    .populate('idCandidate', 'firstName lastName')
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `${notFoundTxt} ${id}`, error: true });
      return res.status(200).json({ msg: 'Session deleted', data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
};

module.exports = {
  getAll,
  search,
  add,
  getById,
  edit,
  remove,
};
