const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  name: {
    type: String,
  },
});

module.exports = mongoose.model('Course', CourseSchema);
