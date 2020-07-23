const mongoose = require('mongoose');
const config = require('config');

const db = config.get('MONGO_URI');

const CONNECT_DB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('DATABASE CONNECTED!');
  } catch (error) {
    console.error('DATABASE FAILED!', err.message);
    process.exit(1);
  }
};

module.exports = CONNECT_DB;
