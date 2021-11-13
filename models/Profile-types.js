const mongoose = require('mongoose');

const { Schema } = mongoose;

const profileTypesSchema = new Schema({
  id: { type: mongoose.isValidObjectId, required: true },
  name: { type: String, minlength: 1, required: true },
  isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model('ProfileTypes', profileTypesSchema);
