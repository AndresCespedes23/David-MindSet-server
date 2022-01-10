const { ObjectId } = require('mongoose').Types;
const Candidates = require('../../models/Candidates');
const Users = require('../../models/Users');

const notFoundText = 'Candidate not found by';

const getAll = (req, res) => {
  Candidates.find()
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

// const search = (req, res) => {
//   const queryParam = req.query;
//   const firstName = queryParam.name.toLowerCase() || null;
//   if (!firstName) return res.status(400).json({ msg: 'Missing query param: name', error: true });
//   return Candidates.find({ firstName })
//     .then((data) => {
//       if (data.length === 0) {
//         return res.status(404).json({ msg: `${notFoundText} name: ${firstName}`, error: true });
//       }
//       return res.status(200).json(data);
//     })
//     .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
// };

const edit = async (req, res) => {
  try {
    const { id } = req.params;
    const candidate = await Candidates.findById({ _id: new ObjectId(id) });
    if (!candidate) return res.status(404).json({ msg: `${notFoundText} ID: ${id}`, error: true });
    candidate.isOpenToWork = req.body.isOpenToWork;
    candidate.isActive = req.body.isActive;
    const data = await Candidates.findByIdAndUpdate(id, candidate, { new: true });
    return res.status(200).json({ msg: 'Candidate updated', data });
  } catch (err) {
    return res.status(500).json({ msg: `Error: ${err}`, error: true });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const candidate = await Candidates.findById({ _id: new ObjectId(id) });
    if (!candidate) return res.status(404).json({ msg: `${notFoundText} ID: ${id}`, error: true });
    const { email } = candidate;
    await Candidates.findByIdAndRemove(id);
    await Users.findOneAndRemove({ email });
    return res.status(200).json({ msg: 'Candidate deleted', data: candidate });
  } catch (err) {
    return res.status(500).json({ msg: `Error: ${err}`, error: true });
  }
};

module.exports = {
  getAll,
  getById,
  // search,
  edit,
  remove,
};
