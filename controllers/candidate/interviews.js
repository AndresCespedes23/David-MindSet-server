const { ObjectId } = require('mongoose').Types;
const Interviews = require('../../models/Interviews');

const notFoundTxt = 'Interview not found by';

const getPending = (req, res) => {
  const { id } = req.params;
  Interviews.find({ idCandidate: id, status: 'pending', isActive: true })
    .populate('idCompany', 'name')
    .populate('idCandidate', 'firstName lastName')
    .populate('idOpenPosition', 'jobDescription')
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
};

const changeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const interview = await Interviews.find({ _id: new ObjectId(id), isActive: true });
    if (!interview) return res.status(404).json({ msg: `${notFoundTxt} ID: ${id}`, error: true });
    interview[0].status = req.body.status;
    interview[0].result = req.body.result ? req.body.result : undefined;
    const data = await Interviews.findByIdAndUpdate(id, interview[0], { new: true });
    return res.status(200).json({ msg: 'Interview updated', data });
  } catch (err) {
    return res.status(500).json({ msg: `Error: ${err}`, error: true });
  }
};

module.exports = {
  getPending,
  changeStatus,
};
