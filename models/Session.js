const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SessionSchema = new Schema({
  start: {
    type: Date,
    required:true
  },
  end: {
    type: Date,
    required:true
  },
  year: {
    type: String,
    required:true
  }
});

module.exports = mongoose.model('Session', SessionSchema);
