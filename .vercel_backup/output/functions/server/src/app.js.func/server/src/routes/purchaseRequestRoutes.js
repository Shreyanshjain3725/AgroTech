const express = require('express');
const PurchaseRequest = require('../models/PurchaseRequest');
const basicAuth = require('../middleware/basicAuth');

const router = express.Router();

function parseDate(v) {
  if (!v) return null;
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? null : d;
}

router.post('/', basicAuth, async (req, res) => {
  try {
    const requestDate = parseDate(req.body.requestDate);
    const neededDate = parseDate(req.body.neededDate);
    if (!requestDate || !neededDate) {
      return res.status(400).json({ message: 'Invalid dates' });
    }
    const doc = await PurchaseRequest.create({
      farmerUsername: req.authUser.username,
      cropType: req.body.cropType,
      quantity: Number(req.body.quantity),
      price: Number(req.body.price),
      requestDate,
      neededDate,
      status: 'pending',
      middlemanUsername: null,
    });
    res.json(doc.toJSON());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', basicAuth, async (req, res) => {
  try {
    const list = await PurchaseRequest.find({
      farmerUsername: req.authUser.username,
      status: 'pending',
    }).sort({ _id: -1 });
    res.json(list.map((d) => d.toJSON()));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/all-pending', basicAuth, async (req, res) => {
  try {
    const list = await PurchaseRequest.find({ status: 'pending' }).sort({ _id: -1 });
    res.json(list.map((d) => d.toJSON()));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/pending', basicAuth, async (req, res) => {
  try {
    const list = await PurchaseRequest.find({ status: 'pending' }).sort({ _id: -1 });
    res.json(list.map((d) => d.toJSON()));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id/status', basicAuth, async (req, res) => {
  try {
    const normalized = String(req.query.status || '').trim().toLowerCase();
    if (normalized !== 'pending' && normalized !== 'fulfilled') {
      return res.status(400).send("Status must be 'pending' or 'fulfilled'");
    }
    const pr = await PurchaseRequest.findById(req.params.id);
    if (!pr) return res.status(404).send(`PurchaseRequest with id ${req.params.id} not found`);

    pr.status = normalized;
    if (normalized === 'fulfilled') {
      pr.middlemanUsername = req.authUser.username;
    } else {
      pr.middlemanUsername = null;
    }
    await pr.save();
    res.json(pr.toJSON());
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', basicAuth, async (req, res) => {
  try {
    const doc = await PurchaseRequest.findById(req.params.id);
    if (!doc) return res.status(404).end();
    if (doc.farmerUsername !== req.authUser.username) {
      return res.status(403).send('Unauthorized deletion attempt');
    }
    await PurchaseRequest.deleteOne({ _id: req.params.id });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
