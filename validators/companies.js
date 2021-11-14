function requiredCompanies(req, res, next) {
  res.locals.name = 'name';
  res.locals.address = 'address';
  res.locals.city = 'city';
  res.locals.province = 'province';
  res.locals.country = 'country';
  res.locals.zipCode = 'zipCode';
  res.locals.phone = 'phone';
  res.locals.email = 'email';
  res.locals.fullName = 'fullName';
  res.locals.contactPhone = 'contactPhone';
  return next();
}

module.exports = { requiredCompanies };
