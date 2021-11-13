const validate = (object) => {
  let missingParameters = [];
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      if (object[key] === undefined) {
        missingParameters.push(key);
      }
    }
  }
  if (missingParameters.length) return missingParameters;
  return false;
};
module.exports = { validate };
