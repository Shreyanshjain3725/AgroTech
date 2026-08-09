const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, trim: true },
    phoneNumber: { type: String, default: '' },
    address: { type: String, default: '' },
    bio: { type: String, default: '' },
    companyName: { type: String, default: '' },
    businessType: { type: String, default: '' },
    preferredCrops: { type: String, default: '' },
    marketRegions: { type: String, default: '' },
    businessLicenseNumber: { type: String, default: '' },
    password: { type: String, required: true },
    role: { type: String, enum: ['FARMER', 'MIDDLEMAN'], required: true },
    profilePicture: { type: Buffer, default: undefined },
  },
  { timestamps: false }
);

module.exports = mongoose.model('User', userSchema);
