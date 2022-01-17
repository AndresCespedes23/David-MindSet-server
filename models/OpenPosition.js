const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const OpenPositionstSchema = new Schema({
  id: Schema.Types.ObjectId,
  idCompany: {
    type: Schema.Types.ObjectId,
    ref: 'Companies',
    required: true,
  },
  idProfile: {
    type: Schema.Types.ObjectId,
    ref: 'ProfileTypes',
    required: true,
  },
  startDate: {
    type: Date,
    minlength: 10,
    maxlength: 10,
    required: true,
  },
  endDate: {
    type: Date,
    minlength: 10,
    maxlength: 10,
    default: null,
  },
  jobDescription: {
    type: String,
    minlength: 10,
    maxlength: 500,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

module.exports = model('OpenPositions', OpenPositionstSchema);
