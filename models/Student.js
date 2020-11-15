const mongoose = require("mongoose");
const User = require("./User")
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    username: {
        type: String,
        unique: true,
        maxlength: 30,
        trim: true,
    },
    student_id: {
        type: String,
        required: true,
    },
})

module.exports = User.discriminator('Student', StudentSchema);


// const StudentSchema = User.discriminator("Student", new Schema({})
// module.exports = mongoose.model('Student', StudentSchema);