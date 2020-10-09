const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FacultySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  department: [{
    type: Schema.Types.ObjectId,
    ref: "Department",
  }]
});

module.exports = mongoose.model('Faculty', FacultySchema);
