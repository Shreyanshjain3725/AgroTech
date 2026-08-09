const mongoose = require('mongoose');

let isConnected = false;

async function connectDB() {
  if (isConnected) {
    return;
  }
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/agrotech';
  mongoose.set('strictQuery', true);
  const db = await mongoose.connect(uri);
  isConnected = db.connections[0].readyState;
}

module.exports = connectDB;
