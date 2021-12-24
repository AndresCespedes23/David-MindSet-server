// PUEDE SER QUE SIRVA . SI NO BORRAR

/* eslint-disable no-unused-vars */
const Users = require('../models/Users');
const Candidates = require('../models/Candidates');

const candidateRoleMiddleware = (req, res, next) => {
  // agarrar id del token
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
          next();
        });
    })
    .catch((error) => {
      res.status(401).json({ message: error.toString() });
    });
};

module.exports = candidateRoleMiddleware;
