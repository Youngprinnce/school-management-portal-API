const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DepartmentSchema = new Schema({
  name: {
    type: String,
    required:true
  },
  course: [{
    type: Schema.Types.ObjectId,
    ref:"Course"
  }],
  faculty: {
    type: Schema.Types.ObjectId,
    ref:"Faculty"
  }
});

module.exports = mongoose.model('Department', DepartmentSchema);
