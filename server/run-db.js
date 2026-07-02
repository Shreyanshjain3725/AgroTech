const { MongoMemoryServer } = require('mongodb-memory-server');

async function start() {
  console.log('Starting MongoDB Memory Server on port 27017...');
  try {
    const mongod = await MongoMemoryServer.create({
      instance: {
        port: 27017,
        dbName: 'agrotech'
      }
    });
    console.log('MongoDB Memory Server is running at:', mongod.getUri());
    
    // Handle cleanup on exit
    const stopServer = async () => {
      console.log('Stopping MongoDB Memory Server...');
      await mongod.stop();
      process.exit(0);
    };

    process.on('SIGINT', stopServer);
    process.on('SIGTERM', stopServer);
  } catch (err) {
    console.error('Failed to start MongoDB Memory Server:', err);
    process.exit(1);
  }
}

start();
