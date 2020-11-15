const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
    student_id: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        default: "failed",
        enum:["success", "failed"]
    },
    ref_id: {
        type: String,
        required: true,
    },
    session_id: {
        type: Schema.Types.ObjectId,
        ref: "Session",
    },
});

module.exports = mongoose.model('Payment', PaymentSchema);