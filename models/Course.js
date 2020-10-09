const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  name: {
    type: String,
    required:true,
  },
  code: {
    type: String,
    required: true,
  },
  unit: {
    type: Number,
    required:true
  },
  department: {
    type: Schema.Types.ObjectId,
    ref:"Department"
  }
});

module.exports = mongoose.model('Course', CourseSchema);
