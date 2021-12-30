const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const PsychologistSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
  },
  firstName: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 40,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 40,
  },
  email: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 40,
  },
  pictureUrl: {
    type: String,
    default: null,
  },
  timeRange: {
    monday: {
      from: { type: Number, min: 0, max: 23 },
      to: { type: Number, min: 1, max: 24 },
    },
    tuesday: {
      from: { type: Number, min: 0, max: 23 },
      to: { type: Number, min: 1, max: 24 },
    },
    wednesday: {
      from: { type: Number, min: 0, max: 23 },
      to: { type: Number, min: 1, max: 24 },
    },
    thursday: {
      from: { type: Number, min: 0, max: 23 },
      to: { type: Number, min: 1, max: 24 },
    },
    friday: {
      from: { type: Number, min: 0, max: 23 },
      to: { type: Number, min: 1, max: 24 },
    },
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

module.exports = model('Psychologist', PsychologistSchema);
