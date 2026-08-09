const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { userToPublicJson } = require('../utils/userJson');

const router = express.Router();

router.post('/register/farmer', async (req, res) => {
  try {
    const { username, email } = req.body;
    if (await User.findOne({ $or: [{ username }, { email }] })) {
      return res.status(400).json({ message: 'Username or email already taken' });
    }
    const password = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      ...req.body,
      password,
      role: 'FARMER',
    });
    const safe = userToPublicJson(user);
    res.json(safe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/register/middleman', async (req, res) => {
  try {
    const { username, email } = req.body;
    if (await User.findOne({ $or: [{ username }, { email }] })) {
      return res.status(400).json({ message: 'Username or email already taken' });
    }
    const password = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      ...req.body,
      password,
      role: 'MIDDLEMAN',
    });
    const safe = userToPublicJson(user);
    res.json(safe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const user = await User.findOne({ username });
    if (
      !user ||
      !(await bcrypt.compare(password, user.password)) ||
      user.role.toUpperCase() !== String(role).toUpperCase()
    ) {
      return res.status(401).send('Invalid credentials or role');
    }
    res.json({
      message: 'Login successful',
      username: user.username,
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
