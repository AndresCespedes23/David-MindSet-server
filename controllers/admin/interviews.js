const { ObjectId } = require('mongoose').Types;

const Interviews = require('../../models/Interviews');
const { getCurrentWeekCandidate, getAvailableDatesCandidate } = require('../../helpers');

const notFoundTxt = 'Interview not found by';

const getAll = (req, res) => {
  Interviews.find()
    .populate('idCompany', 'name')
    .populate('idCandidate', 'firstName lastName')
    .populate('idOpenPosition', 'jobDescription startDate endDate')
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).json({ msg: `Error: ${err}`, error: true }));
};

const getById = (req, res) => {
  const { id } = req.params;
  Interviews.findById(id)
    .populate('idCompany', 'name')
    .populate('idCandidate', 'firstName lastName')
    .populate('idOpenPosition', 'jobDescription startDate endDate')
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `${notFoundTxt} ID: ${id}`, error: true });
      return res.status(200).json(data);
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
};

const add = (req, res) => {
  const newInterview = new Interviews({
    idCompany: req.body.idCompany,
    idOpenPosition: req.body.idOpenPosition,
    idCandidate: req.body.idCandidate,
    date: req.body.date,
    time: req.body.time,
    isActive: true,
  });
  newInterview
    .save()
    .then((data) => res.status(200).json({ msg: 'Interview created', data }))
    .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
};

const edit = async (req, res) => {
  try {
    const { id } = req.params;
    const interview = await Interviews.findById({ _id: new ObjectId(id) });
    if (!interview) return res.status(404).json({ msg: `${notFoundTxt} ID: ${id}`, error: true });
    interview.status = req.body.status ? req.body.status : interview.status;
    interview.result = req.body.result ? req.body.result : interview.result;
    if (req.body.time || req.body.time) interview.status = 'pending';
    interview.date = req.body.date ? req.body.date : interview.date;
    interview.time = req.body.time ? req.body.time : interview.time;
    const data = await Interviews.findByIdAndUpdate(id, interview, { new: true });
    return res.status(200).json({ msg: 'Interview updated', data });
  } catch (err) {
    return res.status(500).json({ msg: `Error: ${err}`, error: true });
  }
};

const getAvailableInterviews = async (req, res) => {
  const { id } = req.params;
  const availableDates = await getAvailableDatesCandidate(id);
  const currentWeek = getCurrentWeekCandidate();
  return res.status(200).json({ availableDates, currentWeek });
};

const cancelOutdatedInterviews = async (req, res) => {
  const { id } = req.params;
  try {
    const interviews = await Interviews.find({
      $and: [
        { idCandidate: id },
        { $or: [{ status: 'pending' }, { status: 'accepted' }, { status: 'reschedule' }] },
      ],
    });
    if (!interviews.length) {
      return res.status(200).json({ msg: `No interviews found for id: ${id}` });
    }
    await Promise.all(
      interviews.map(async (interview) => {
        const newInterview = interview;
        newInterview.status = 'declined';
        await Interviews.findByIdAndUpdate(interview._id, newInterview, { new: true });
      }),
    );
  } catch (err) {
    res.status(500).json({ msg: `Error: ${err}`, error: true });
  }
  return res.status(200).json({ msg: 'Interview(s) cancelled' });
};

module.exports = {
  getAll,
  getById,
  add,
  edit,
  getAvailableInterviews,
  cancelOutdatedInterviews,
};
