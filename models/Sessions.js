const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const sessionsSchema = new Schema({
  id: Schema.Types.ObjectId,
  idPsychologists: { type: Schema.Types.ObjectId, ref: 'Psychologists', required: true },
  idCandidate: { type: Schema.Types.ObjectId, ref: 'Candidate', required: true },
  date: { type: Date, required: true },
  isActive: { type: Boolean, default: true },
});

module.exports = model('Sessions', sessionsSchema);
