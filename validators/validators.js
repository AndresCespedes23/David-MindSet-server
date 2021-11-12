const validate = (object) => {
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      if (object[key] === undefined) {
        return false;
      }
    }
  }
  return true;
};
