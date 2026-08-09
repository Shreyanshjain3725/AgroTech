const express = require('express');
const PurchaseRequest = require('../models/PurchaseRequest');
const User = require('../models/User');
const basicAuth = require('../middleware/basicAuth');
const { userToPublicJson } = require('../utils/userJson');

const router = express.Router();

router.get('/', basicAuth, async (req, res) => {
  try {
    const list = await PurchaseRequest.find({
      farmerUsername: req.authUser.username,
      status: 'fulfilled',
    }).sort({ _id: -1 });
    res.json(list.map((d) => d.toJSON()));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/middleman', basicAuth, async (req, res) => {
  try {
    const list = await PurchaseRequest.find({
      middlemanUsername: req.authUser.username,
      status: 'fulfilled',
    }).sort({ _id: -1 });
    res.json(list.map((d) => d.toJSON()));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/profile/:username', basicAuth, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).end();
    res.json(userToPublicJson(user));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
