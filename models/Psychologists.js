const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const PsychologistSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
  },
  firstName: {
    type: String,
    required: true,
    minLenght: 2,
    maxLength: 40,
  },
  lastName: {
    type: String,
    required: true,
    minLenght: 2,
    maxLength: 40,
  },
  email: {
    type: String,
    required: true,
    minLenght: 5,
    maxLength: 40,
  },
  pictureUrl: {
    type: String,
    default: null,
  },
  turns: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Session',
      default: [],
    },
  ],
  isActive: {
    type: Boolean,
    default: true,
  },
});

module.exports = model('Psychologist', PsychologistSchema);
