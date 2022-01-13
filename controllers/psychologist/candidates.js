const Candidates = require('../../models/Candidates');
const OpenPosition = require('../../models/OpenPosition');
const Applications = require('../../models/Applications');

const notFoundText = 'Candidate not found by';

const getAll = (req, res) => {
  Candidates.find().populate('profileTypes', 'name')
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(500).json({ msg: `Error: ${error}`, error: true }));
};

const getById = (req, res) => {
  const { id } = req.params;
  Candidates.findById(id)
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `${notFoundText} ID: ${id}`, error: true });
      return res.status(200).json(data);
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
};

const edit = async (req, res) => {
  const { id } = req.params;
  const infoCandidate = await Candidates.findByIdAndUpdate(id, req.body, { new: true });
  if (!infoCandidate) return res.status(404).json({ msg: `${notFoundText} ID: ${id}`, error: true });
  const openPositions = await OpenPosition.find({ idProfile: req.body.idProfile });
  if (openPositions.length !== 0) {
    openPositions.forEach((openPosition) => {
      const newApplication = new Applications({
        idOpenPosition: openPosition._id,
        idCandidate: id,
        status: true,
        isActive: true,
      });
      newApplication
        .save()
        .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
    });
    return res.status(201).json({ msg: `Candidate updated and ${openPositions.length} applications created`, infoCandidate });
  }
  return res.status(201).json({ msg: 'Candidate updated but there is no applicants for this position', infoCandidate });
};

module.exports = {
  getAll,
  getById,
  edit,
};
