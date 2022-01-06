const Psychologist = require('../../models/Psychologists');
const Users = require('../../models/Users');
const Firebase = require('../../helpers/firebase');

const notFoundTxt = 'Psychologist not found by';

const getAll = (req, res) => {
  Psychologist.find()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
};

const getById = (req, res) => {
  const { id } = req.params;
  Psychologist.findById(id)
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `${notFoundTxt} ID: ${id}`, error: true });
      return res.status(200).json(data);
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
};

// const search = (req, res) => {
//   const { text } = req.query;
//   Psychologist.find({ firstName: text })
//     .then((data) => {
// eslint-disable-next-line max-len
//       if (data.length === 0) return res.status(404).json({ msg: `${notFoundTxt} Name: ${text}`, error: true });
//       return res.status(200).json(data);
//     })
//     .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
// };

const add = async (req, res) => {
  try {
    // Create user in Firebase
    const newFirebaseUser = await Firebase.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });
    // Create new user
    const userCreated = new Users({
      email: req.body.email,
      firebaseUid: newFirebaseUser.uid,
      role: 'psychologist',
    });
    // add to the candidates collection too
    const newPsychologist = new Psychologist({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      pictureUrl: req.body.pictureUrl,
      timeRange: req.body.timeRange,
      isActive: true,
    });
    const data = await newPsychologist.save();
    // Save the new user on DB
    await userCreated.save();
    return res.status(201).json({ msg: 'Psychologist created', data });
  } catch (err) {
    return res.status(500).json({ msg: `Error: ${err}`, error: true });
  }
};

const edit = (req, res) => {
  const { id } = req.params;
  Psychologist.findByIdAndUpdate(id, req.body, { new: true })
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `${notFoundTxt} ID: ${id}`, error: true });
      return res.status(200).json({ msg: 'Psychologist updated', data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
};

const remove = (req, res) => {
  const { id } = req.params;
  Psychologist.findByIdAndRemove(id)
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `${notFoundTxt} ID: ${id}`, error: true });
      return res.status(200).json({ msg: 'Psychologist deleted', data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
};

module.exports = {
  getAll,
  getById,
  // search,
  add,
  edit,
  remove,
};
