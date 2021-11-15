const mongoose = require('mongoose');

const { Schema } = mongoose;
const CompaniesSchema = new Schema({
  id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 40,
  },
  address: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 40,
  },
  city: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 40,
  },
  province: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 40,
  },
  country: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 40,
  },
  zipCode: {
    type: Number,
    required: true,
    max: 10000,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 40,
  },
  pictureUrl: {
    type: String,
    maxlength: 200,
    default: '',
  },
  contactFullName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 40,
  },
  contactPhone: {
    type: Number,
    minlength: 2,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model('Companies', CompaniesSchema);
