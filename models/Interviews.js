const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const IntervewsSchema = new Schema({
  id: Schema.Types.ObjectId,
  idCompany: {
    type: Schema.Types.ObjectId,
    ref: 'Companies',
    required: true,
  },
  idCandidate: {
    type: Schema.Types.ObjectId,
    ref: 'Candidates',
    required: true,
  },
  idOpenPosition: {
    type: Schema.Types.ObjectId,
    ref: 'OpenPositions',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: Number,
    required: true,
    min: 0,
    max: 23,
  },
  status: {
    type: Boolean,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

module.exports = model('Interviews', IntervewsSchema);
