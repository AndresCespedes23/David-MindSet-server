const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const PsychologistSchema = new Schema({
  id: Schema.Types.ObjectId,
  idPsychologists: { type: mongoose.Schema.type.ObjectId, ref: 'Psychologists', required: true },
  idCandidate: { type: mongoose.Schema.type.ObjectId, ref: 'Candidate', required: true },
  date: { type: Date, required: true },
  isActive: { type: Boolean, default: true },
})

module.exports = model('Sessions', SessionsSchema);