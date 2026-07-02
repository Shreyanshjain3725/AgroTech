const express = require('express');
const multer = require('multer');
const User = require('../models/User');
const basicAuth = require('../middleware/basicAuth');
const { userToPublicJson } = require('../utils/userJson');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/profile', basicAuth, async (req, res) => {
  try {
    const user = req.authUser;
    const data = {
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber,
      address: user.address,
      bio: user.bio,
      companyName: user.companyName,
      businessType: user.businessType,
      marketRegions: user.marketRegions,
      businessLicenseNumber: user.businessLicenseNumber,
    };
    if (user.profilePicture && user.profilePicture.length) {
      data.profilePicture = user.profilePicture.toString('base64');
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put(
  '/profile',
  basicAuth,
  upload.single('profilePicture'),
  async (req, res) => {
    try {
      const user = await User.findById(req.authUser._id);
      if (!user) return res.status(404).send('User not found');

      user.phoneNumber = req.body.phoneNumber ?? '';
      user.address = req.body.address ?? '';
      user.bio = req.body.bio ?? '';
      user.companyName = req.body.companyName ?? '';
      user.businessType = req.body.businessType ?? '';
      user.marketRegions = req.body.marketRegions ?? '';
      user.businessLicenseNumber = req.body.businessLicenseNumber ?? '';

      if (req.file && req.file.buffer && req.file.buffer.length) {
        user.profilePicture = req.file.buffer;
      }

      await user.save();
      res.send('Profile updated successfully');
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

router.get('/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).end();
    res.json(userToPublicJson(user));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
