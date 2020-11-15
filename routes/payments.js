const express = require('express');
const router = express.Router();

const {
    initializePayment,
    verifyPayment
} = require('../Controllers/paymentController');

module.exports = () => {
    router.post("/", initializePayment)
    router.get("/verify", verifyPayment);
    return router;
};
