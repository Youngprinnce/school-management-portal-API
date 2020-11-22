const Payment = require("../models/Payment");
const request = require("request");
const {sendSuccess, sendError} = require("../utils/responseHandler")
const secretKey = `Bearer ${process.env.PAYSTACK_KEY}`;

const initializePayment = (req, res) => {
    const { student_id, amount, session_id, email } = req.body
    const paystackAmount = amount * 100;
    const form = {
        amount: paystackAmount,
        email, metadata: {
            student_id, session_id
        }
    };
    
    const options = {
        url: 'https://api.paystack.co/transaction/initialize',
        headers: {
            authorization: secretKey,
            'content-type': 'application/json',
            'cache-control': 'no-cache'
        },
        form
    }
    
    request.post(options, (error,body) => {
        if (error) {
            sendError(res, error)
        }
        const response = JSON.parse(body.body);
        sendSuccess(res, response.data.authorization_url);
    });
}

const verifyPayment = async (req, res) => {
    const ref = req.query.reference;

    const options = {
        url: 'https://api.paystack.co/transaction/verify/' + encodeURIComponent(ref),
        headers: {
            authorization: secretKey,
            'content-type': 'application/json',
            'cache-control': 'no-cache'
        }
    }

    request(options, async (error, body) => {
        if (error) {
            sendError(res, error);
        }
        const response = JSON.parse(body.body);
        const { reference, amount, status, metadata } = response.data;
       
        const payment = new Payment({
            ref_id: reference,
            amount: amount / 100,
            status,
            student_id: metadata.student_id,
            session_id: metadata.session_id
        });

        await payment.save((error, data) => {
            if (error) {
                sendError(res, error)
            }
            const message = "New Payment Made"
            sendSuccess(res,data, message)
       });
    });
}

module.exports = {
    initializePayment,verifyPayment
}