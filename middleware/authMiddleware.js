const firebase = require('../helpers/firebase');
const Users = require('../models/Users');

const authMiddlewareCandidate = (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(400).json({ message: 'Provide a token' });
  }
  return firebase
    .auth()
    .verifyIdToken(token)
    .then(async (decodedToken) => {
      const { email } = decodedToken;
      const user = await Users.find({ email });
      if (user[0].role !== 'candidate') {
        return res.status(401).json({ message: 'User does not have access.' });
      }
      return next();
    })
    .catch((error) => {
      res.status(401).json({ message: error.toString() });
    });
};

const authMiddlewareAdmin = (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(400).json({ message: 'Provide a token' });
  }
  return firebase
    .auth()
    .verifyIdToken(token)
    .then(async (decodedToken) => {
      const { email } = decodedToken;
      const user = await Users.find({ email });
      if (user[0].role !== 'admin') {
        return res.status(401).json({ message: 'User does not have access.' });
      }
      return next();
    })
    .catch((error) => {
      res.status(401).json({ message: error.toString() });
    });
};

const authMiddlewarePsychologist = (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(400).json({ message: 'Provide a token' });
  }
  return firebase
    .auth()
    .verifyIdToken(token)
    .then(async (decodedToken) => {
      const { email } = decodedToken;
      const user = await Users.find({ email });
      if (user[0].role !== 'psychologist') {
        return res.status(401).json({ message: 'User does not have access.' });
      }
      return next();
    })
    .catch((error) => {
      res.status(401).json({ message: error.toString() });
    });
};

module.exports = {
  authMiddlewareCandidate,
  authMiddlewareAdmin,
  authMiddlewarePsychologist,
};
