const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const profileTypesSchema = new Schema({
  id: Schema.Types.ObjectId,
  name: {
    type: String,
    minlength: 1,
    maxlength: 50,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

module.exports = model('ProfileTypes', profileTypesSchema);
