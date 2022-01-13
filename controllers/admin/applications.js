const { ObjectId } = require('mongoose').Types;

const Applications = require('../../models/Applications');
const Profiles = require('../../models/ProfileTypes');

const notFoundTxt = 'Application not found by';

const getAll = (req, res) => {
  Applications.find()
    .populate('idCandidate', 'firstName lastName')
    .populate('idOpenPosition', 'jobDescription idCompany idProfile startDate endDate')
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
};

const getById = (req, res) => {
  const { id } = req.params;
  Applications.findById(id)
    .populate('idCandidate', 'firstName lastName')
    .populate('idOpenPosition', 'jobDescription')
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `${notFoundTxt} ID: ${id}`, error: true });
      return res.status(200).json(data);
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
};

// const add = (req, res) => {
//   const newApplication = new Applications({
//     idOpenPosition: req.body.idOpenPosition,
//     idCandidate: req.body.idCandidate,
//     status: true,
//     isActive: true,
//   });
//   newApplication
//     .save()
//     .then((data) => res.status(201).json({ msg: 'Application created', data }))
//     .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
// };

const edit = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await Applications.findById({ _id: new ObjectId(id) });
    if (!application) return res.status(404).json({ msg: `${notFoundTxt} ID: ${id}`, error: true });
    application.status = req.body.status;
    const data = await Applications.findByIdAndUpdate(id, application, { new: true });
    return res.status(200).json({ msg: 'Application updated', data });
  } catch (err) {
    return res.status(500).json({ msg: `Error: ${err}`, error: true });
  }
};

const getReport = async (req, res) => {
  try {
    const profiles = await Profiles.find({ isActive: true });
    const applications = await Applications.find({ isActive: true }).populate(
      'idOpenPosition',
      'idProfile',
    );
    const reportResults = [];
    profiles.forEach((profile) => {
      const filteredApplications = applications.filter(
        (application) => application.idOpenPosition.idProfile.toString() === profile._id.toString(),
      );
      reportResults.push({
        id: profile._id,
        name: profile.name,
        applications: filteredApplications,
      });
    });
    res.status(200).json(reportResults);
  } catch (err) {
    res.status(500).json({ msg: `Error: ${err}`, error: true });
  }
};

const getFilteredReport = async (req, res) => {
  try {
    let profiles;
    if (req.query.profile) {
      profiles = await Profiles.find({ isActive: true, _id: req.query.profile });
    } else profiles = await Profiles.find({ isActive: true });
    const applications = await Applications.find({ isActive: true }).populate(
      'idOpenPosition',
      'idProfile',
    );
    const reportResults = [];
    profiles.forEach((profile) => {
      // prettier-ignore
      const filteredApplications = applications.filter(
        (application) => (
          application.idOpenPosition.idProfile.toString() === profile._id.toString()
          && application.createdAt >= new Date(`${req.query.from}T00:00`)
          && application.createdAt <= new Date(`${req.query.to}T23:59`)
        ),
      );
      reportResults.push({
        id: profile._id,
        name: profile.name,
        applications: filteredApplications,
      });
    });
    res.status(200).json(reportResults);
  } catch (err) {
    res.status(500).json({ msg: `Error: ${err}`, error: true });
  }
};

module.exports = {
  getAll,
  // add,
  edit,
  getById,
  getReport,
  getFilteredReport,
};
