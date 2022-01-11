/* eslint-disable no-case-declarations */
/* eslint-disable max-len */
const Users = require('../models/Users');
const Firebase = require('../helpers/firebase');
const Candidates = require('../models/Candidates');
const Admins = require('../models/Administrators');
const Psychologists = require('../models/Psychologists');

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
      firstName: req.body.firstName,
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
    await newCandidate.save();
    // Save the new user on DB
    await userCreated.save();
    return res.status(201).json({
      message: 'User created',
    });
  } catch (error) {
    return res.status(400).json({ message: error.toString() });
  }
};

const loginServer = (req, res) => {
  const { token } = req.headers;
  Firebase
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      const { email } = decodedToken;
      Users.find({ email })
        .then(async (data) => {
          try {
            switch (data[0].role) {
              case 'candidate':
                const candidate = await Candidates.find({ email });
                return res.status(200).json({ role: 'candidate', user: candidate[0] });
              case 'admin':
                const admin = await Admins.find({ email });
                return res.status(200).json({ role: 'admin', user: admin[0] });
              case 'psychologist':
                const psychologist = await Psychologists.find({ email });
                return res.status(200).json({ role: 'psychologist', user: psychologist[0] });
              default: return res.status(401).json({ message: 'not role found' });
            }
          } catch (error) {
            return res.status(401).json({ message: error.toString() });
          }
        })
        .catch((error) => {
          res.status(401).json({ message: error.toString() });
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
