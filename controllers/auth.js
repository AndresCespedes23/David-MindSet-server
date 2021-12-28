/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
// const jwt = require('jsonwebtoken');
const Users = require('../models/Users');
const Firebase = require('../helpers/firebase');
const Candidates = require('../models/Candidates');
const Psychologists = require('../models/Administrators');
const Admins = require('../models/Psychologists');

// USING ASYNC AWAIT
const register = async (req, res) => {
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
      role: 'candidate',
    });
    // add to the candidates collection too
    const newCandidate = new Candidates({
      firstName: req.body.firstName.toLowerCase(),
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      address: {
        street: req.body.address.street,
        number: req.body.address.number,
      },
      city: req.body.city,
      province: req.body.province,
      country: req.body.country,
      postalCode: req.body.postalCode,
      birthday: req.body.birthday,
      pictureUrl: req.body.pictureUrl,
    });
    const ouser = await newCandidate.save();
    // Save the new user on DB
    const userSaved = await userCreated.save();
    // Response with the new user created
    return res.status(201).json({
      message: 'User created',
      data: ouser,
    });
  } catch (error) {
    // Return error
    return res.status(400).json({ message: error.toString() });
  }
};

const loginServer = (req, res, next) => {
  const emailFE = req.params.email;
  Users.find({ email: emailFE })
    .then((data) => {
      // CUANDO DECODIFIQUEMOS EL TOKEN, SI O SI DEBERÍA ENCONTRAR 1 POR LO QUE EL IF SIGUIENTE ESTARÍA DE MÁS
      if (data.length === 0) {
        throw new Error(
          res.status(401).json({ msg: 'Email unknown' }),
        );
      }
      if (!data[0].role) return res.status(401).json({ message: 'not role found' });
      return res.status(200).json({ role: data[0].role });
    })
    .catch((error) => {
      res.status(401).json({ message: error.toString() });
    });
};

module.exports = {
  register,
  loginServer,
};
