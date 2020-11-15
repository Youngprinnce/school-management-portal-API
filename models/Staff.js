const mongoose = require("mongoose");
const User = require("./User")
const Schema = mongoose.Schema;

const StaffSchema = new Schema({
    status: {
        type: String,
        default: "single",
        enum: ["single", "married", "divorced"],
    },
    staff_id: {
        type: String,
        required: true,
    },
    staff_level: {
        type: Number,
    },
    qualification: {
        type: String,
        trim: true
    },
    staff_department: {
        type: Schema.Types.ObjectId,
        ref: "Department",
    },
    middle_name: {
        type: String,
        trim: true,
        maxlength: 30
    },
});

module.exports = User.discriminator('Staff', StaffSchema);