const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const PsychologistSchema = new Schema({
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
  turns: { type: Schema.Types.ObjectId, ref: 'Session', default: null },
  isActive: { type: Boolean, default: true },
});

module.exports = model('Psychologist', PsychologistSchema);
