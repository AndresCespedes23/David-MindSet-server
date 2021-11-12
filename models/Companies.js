const mongoose = require('mongoose');

const { Schema } = mongoose;
const CompaniesSchema = new Schema({
  id: Schema.Types.ObjectId,
  name: { type: String, required: true, default: 'asd' },
  address: { type: String, required: true, default: 'asd' },
  city: { type: String, required: true, default: 'asd' },
  province: { type: String, required: true, default: 'asd' },
  country: { type: String, required: true, default: 'asd' },
  zipCode: { type: String, required: true, default: 'asd' },
  phone: { type: String, required: true, default: 'asd' },
  email: { type: String, required: true, default: 'asd' },
  pictureUrl: { type: String },
  contactFullName: { type: String, required: true, default: 'asd' },
  contactPhone: { type: String, required: true, default: 'asd' },
  isActive: Boolean,
});

module.exports = mongoose.model('Companies', CompaniesSchema);
