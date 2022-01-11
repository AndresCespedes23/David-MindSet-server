const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const InterviewsSchema = new Schema({
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
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'declined', 'rescheduled', 'done'],
    required: true,
  },
  result: {
    type: String,
    enum: ['passed', 'failed', 'absent'],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

module.exports = model('Interviews', InterviewsSchema);
