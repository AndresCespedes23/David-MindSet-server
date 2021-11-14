/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */

const required = (req, res, next) => {
  const missingParameters = [];
  for (const requiredElement in res.locals.requirements) {
    // res.locals doesnt have a prototype
    if (!req.body[requiredElement]) {
      missingParameters.push(requiredElement);
    }
  }
  if (missingParameters.length === 0) return next();
  return res.status(400).json({ message: `Missing parameters: ${missingParameters}` });
};
function requiredUsers(req, res, next) {
  if (req.url === 'companies') {
    res.locals.firstName = 'firstName';
    res.locals.lastName = 'lastName';
    res.locals.email = 'email';
    res.locals.password = 'password';
  }
  next();
}
module.exports = {
  required,
  requiredUsers,
};
