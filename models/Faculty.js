const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FacultySchema = new Schema({
  name: {
    type: String,
    required:true
  },
});

module.exports = mongoose.model('Faculty', FacultySchema);
