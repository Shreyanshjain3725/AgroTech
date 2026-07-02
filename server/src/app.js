const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const purchaseRequestRoutes = require('./routes/purchaseRequestRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());

// database precheck middleware for serverless environment
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ message: 'Database connection failed', error: err.message });
  }
});

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/purchase-requests', purchaseRequestRoutes);
app.use('/api/transactions', transactionRoutes);

module.exports = app;
