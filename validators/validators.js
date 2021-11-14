const validate = (data) => {
  const missingParameters = [];
  for (let keyIndex = 0; keyIndex < Object.keys(data).length; keyIndex += 1) {
    if (data[Object.keys(data)[keyIndex]] === undefined) {
      missingParameters.push(Object.keys(data)[keyIndex]);
    }
  }
  if (missingParameters.length) return missingParameters;
  return false;
};
module.exports = { validate };
