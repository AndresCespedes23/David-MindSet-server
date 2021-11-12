const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const CandidatesSchema = new Schema({
  id: Schema.Types.ObjectId,
  firstName: {
    type: String, required: true, minLenght: 2, maxLength: 40,
  },
  lastName: {
    type: String, required: true, minLenght: 2, maxLength: 40,
  },
  email: {
    type: String, required: true, minLenght: 5, maxLength: 40,
  },
  password: {
    type: String, required: true, minLenght: 8, maxLength: 16,
  },
  pictureUrl: { type: String, default: null },
  phone: {
    type: Number, required: true, min: 7, max: 8,
  },
  address: {
    street: {
      type: String, required: true, minlength: 3, maxlength: 40,
    },
    number: {
      type: Number, required: true, min: 10, max: 10000,
    },
  },
  city: {
    type: String, required: true, minlength: 3, maxlength: 40,
  },
  province: {
    type: String, required: true, minlength: 3, maxlength: 40,
  },
  country: {
    type: String, required: true, minlength: 3, maxlength: 40,
  },
  postalCode: {
    type: Number, required: true, min: 1, max: 10000,
  },
  birthday: {
    type: Date, required: true, minlength: 8, maxlength: 8,
  },
  education: [{
    institution: { type: String, minlength: 3, maxlength: 40 },
    city: { type: String, minlength: 3, maxlength: 40 },
    state: { type: String, minlength: 3, maxlength: 40 },
    graduationYear: { type: Number, min: 1, max: 10000 },
    description: { type: String, minlength: 3, maxlength: 40 },
  }],
  experiences: [{
    position: { type: String, minlength: 3, maxlength: 40 },
    company: { type: String, minlength: 3, maxlength: 40 },
    since: { type: Date, minlength: 8, maxlength: 8 },
    until: { type: Date, minlength: 8, maxlength: 8 },
    jobDescription: { type: String, minlength: 3, maxlength: 40 },
  }],
  courses: [{
    tittle: { type: String, minlength: 3, maxlength: 40 },
    institution: { type: String, minlength: 3, maxlength: 40 },
    year: { type: Number, min: 1, max: 10000 },
  }],
  hobbies: [
    { type: String, minlength: 3, maxlength: 40 },
  ],
  mainSkills: [
    { type: String, minlength: 3, maxlength: 40 },
  ],
  profileTypes: [
    { type: Schema.Types.ObjectId, ref: 'profileTypes' },
  ],
  isOpenToWork: { type: Boolean, default: false },

  isActive: { type: Boolean, default: true },
});

module.exports = model('Candidates', CandidatesSchema);
