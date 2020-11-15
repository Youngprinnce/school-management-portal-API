const mongoose = require('mongoose');
const { sessionSchema} = require("../utils/validations/schemas/session")
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
  },
  new_payment: {
    type: Number,
    required:true,
  },
  returning_payment: {
    type: Number,
    required:true,
  }
});

SessionSchema.statics.sessionValidations = (data) => {
  return sessionSchema.validate(data);
};

module.exports = mongoose.model('Session', SessionSchema);
