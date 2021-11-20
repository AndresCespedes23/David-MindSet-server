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
    ref: 'Candidate',
    required: true,
  },
  date: {
    type: Date,
    required: true,
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

module.exports = model('Candidates', IntervewsSchema);
