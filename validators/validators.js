const validate = (object) => {
  const missingParameters = [];
  for (let keyIndex = 0; keyIndex < Object.keys(object).length; keyIndex += 1) {
    if (object[Object.keys(object)[keyIndex]] === undefined) {
      missingParameters.push(Object.keys(object)[keyIndex]);
    }
  }
  if (missingParameters.length) return missingParameters;
  return false;
};
module.exports = { validate };
