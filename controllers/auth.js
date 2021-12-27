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

// PARA QUE EL SERVER ME DEVUELVA EL TIPO DE ROL
const loginServer = (req, res, next) => {
  const authHeader = req.headers.token;
  // NECESITO DECODIFICAR EL TOKEN QUE VIENE EN EL HEADER Y AGARRAR EL ID DE FIREBASE
  // ACÁ HARDCODEADO
  const idToken = 'nqij15pTQtVSRaTh4GyQ45wO7R03';
  Users.find({ firebaseUid: idToken })
    .then((data) => {
      if (data.length === 0) {
        throw new Error(
          res.status(401).json({ msg: 'Firebase Id unknown' }),
        );
      }
      return data[0].email;
    })
    .then((email) => {
      // eslint-disable-next-line max-len
      // PROBLEMA: EJECUTA LAS 3 BÚSQUEDAS POR MÁS QUE YA ENCUENTRE EN UNO. NO SE COMO ROMPER EL CICLO
      Candidates.find({ email })
        .then((data) => {
          if (data.length > 0) res.status(200).json({ role: 'candidate' });
        });
      Admins.find({ email })
        .then((data) => {
          if (data.length > 0) res.status(200).json({ role: 'admin' });
        });
      Psychologists.find({ email })
        .then((data) => {
          if (data.length > 0) res.status(200).json({ role: 'psychologist' });
        });
    })
    .catch((error) => {
      res.status(401).json({ message: error.toString() });
    });
};

module.exports = {
  register,
  loginServer,
};
