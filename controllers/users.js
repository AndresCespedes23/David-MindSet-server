// BORRAR SIMPLEMENTE PARA TESTEAR EN POSTMAN

const Users = require('../models/Users');
const Candidates = require('../models/Candidates');

const getAll = (req, res) => {
  Users.find()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json({ msg: `Error: ${err}`, error: true }));
};

// eslint-disable-next-line no-unused-vars
const searchEamil = (req, res, next) => {
  // TOKEN ID HARDCODEADO
  const idToken = 'Z6OOFg5kAoQJGDBdnT78NHrX4BF2';
  Users.find({ firebaseUid: idToken })
    .then((data) => {
      if (data.length === 0) {
        throw new Error(
          res.status(400).json({ msg: 'Firebase Id unknown' }),
        );
      }
      return data[0].email;
    })
    .then((email) => {
      Candidates.find({ email })
        .then((data) => {
          if (data.length === 0) {
            throw new Error(
              res.status(400).json({ msg: 'Candidate unknown' }),
            );
          }
          return res.status(200).json({ data });
        });
    })
    .catch((error) => {
      res.status(401).json({ message: error.toString() });
    });
};

module.exports = {
  getAll,
  searchEamil,
};
