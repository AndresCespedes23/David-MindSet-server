const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const AdministratorsSchema = new Schema({
  id: Schema.Types.ObjectId,
  firstName: {
    type: String,
    required: true,
    minLenght: 2,
    maxLength: 40,
  },
  lastName: {
    type: String,
    required: true,
    minLenght: 2,
    maxLength: 40,
  },
  email: {
    type: String,
    required: true,
    minLenght: 5,
    maxLength: 40,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

module.exports = model('Administrators', AdministratorsSchema);
