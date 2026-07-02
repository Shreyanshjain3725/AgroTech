require('dotenv').config();
const connectDB = require('./config/db');
const app = require('./app');

const PORT = Number(process.env.PORT) || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`AgroTech API listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });
