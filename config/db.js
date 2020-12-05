const mongoose = require('mongoose');
const dsn = process.env.MONGODB_URI;

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(dsn, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('Connected to DB');
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = InitiateMongoServer;
