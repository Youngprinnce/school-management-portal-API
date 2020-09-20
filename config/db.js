const dotenv = require('dotenv').config();
const dsn = process.env.DB_USER;
const mongoose = require('mongoose');

mongoose.Promise = mongoose.Promise;

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(dsn, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Connected to DB');
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = InitiateMongoServer;
