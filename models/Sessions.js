const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const sessionsSchema = new Schema({
  id: Schema.Types.ObjectId,
  idPsychologist: {
    type: Schema.Types.ObjectId,
    ref: 'Psychologist',
    required: true,
  },
  idCandidate: {
    type: Schema.Types.ObjectId,
    ref: 'Candidates',
    required: true,
  },
  date: { type: Date, required: true },
  isActive: { type: Boolean, default: true },
});

module.exports = model('Sessions', sessionsSchema);
